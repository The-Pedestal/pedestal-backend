const stream = require('getstream');
const Models = require('../models');
const STREAM_KEY = process.env.GETSTREAM_KEY;
const STREAM_SECRET =
    process.env.GETSTREAM_SECRET;

module.exports.get = async (req, res) => {
    const filter = {};
    const {
        cognito_sub,
        interests,
        exclude_ids
    } =
    req.query;

    if (cognito_sub) {
        filter.cognito_sub = cognito_sub;
    }

    if (exclude_ids) {
        filter._id = {
            $nin: exclude_ids.split(','),
        };
    }

    if (interests) {
        filter.interests = {
            $in: interests.split(','),
        };
    }

    res.send({
        success: true,
        data: await Models.User.find(filter),
    });
};

module.exports.show = async (req, res) => {
    const result = {};
    try {
        /**
         * @TODO find a way to optimize this by using a single query.
         */
        const user = await Models.User.findOne({
                _id: req.params.id,
            })
            .populate('interests')
            .populate('experiences')
            .populate('projects')
            .populate('education')
            .populate('social_media')
            .populate('connections', [
                'connected_user',
                '_id',
                'status',
            ])
            .exec();

        res.status(200);
        result.success = true;
        result.data = user;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }

    res.send(result);
};

module.exports.create = async (req, res) => {
    const result = {};
    let error_message = false;

    await Models.User.create(
        req.body,
        async (error, user) => {
            try {
                if (!error) {
                    const client = stream.connect(
                        STREAM_KEY,
                        STREAM_SECRET
                    );
                    const user_id = user._id.toString();

                    await client.user(user_id).create(user);

                    const stream_token =
                        client.createUserToken(user_id);
                    const new_user =
                        await Models.User.findByIdAndUpdate(
                            user_id, {
                                getstream_token: stream_token,
                            }, {
                                returnOriginal: false,
                            }
                        );

                    await client
                        .user(user_id)
                        .update(new_user);

                    res.status(200);

                    result.success = true;
                    result.data =
                        await Models.User.findById(user_id)
                        .populate('interests')
                        .populate('experiences')
                        .populate('education')
                        .populate('projects')
                        .populate('social_media');
                } else {
                    error_message = error.message;
                }
            } catch (error) {
                error_message = error.message;
            }

            if (error_message) {
                res.status(500);
                result.success = false;
                result.error = error.message;
            }

            res.send(result);
        }
    );
};

module.exports.update = async (req, res) => {
    const result = {};
    try {
        const client = stream.connect(
            STREAM_KEY,
            STREAM_SECRET
        );
        const user =
            await Models.User.findByIdAndUpdate(
                req.params.id,
                req.body, {
                    returnOriginal: false,
                }
            );

        await client.user(req.params.id).update(user);

        res.status(200);
        result.success = true;
        result.data = result.data =
            await Models.User.findById(req.params.id)
            .populate('interests')
            .populate('experiences')
            .populate('education')
            .populate('projects')
            .populate('social_media');
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }

    res.send(result);
};

module.exports.delete = async (req, res) => {
    res.send({});
};

module.exports.suggestConnectionToUser = async (req, res) => {
    const user = await Models.User.findById(req.params.id);
    const user_id = user._id.toString();

    const connections = await Models.UserConnection
        .find({
            $or: [{
                user: user._id
            }, {
                connected_user: user._id
            }]
        })
        .select(['connected_user', 'user']);

    res.send({
        success: true,
        data: await Models.User.find({
            _id: {
                $nin: [...connections.map(c => c.connected_user.toString() === user_id ? c.user : c.connected_user), user_id]
            },
            interests: {
                $in: user.interests
            }
        })
    });
}