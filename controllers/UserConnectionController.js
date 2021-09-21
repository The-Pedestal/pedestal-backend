const Models = require('../models')
const stream = require('getstream');
const STREAM_KEY = process.env.GETSTREAM_KEY;
const STREAM_SECRET = process.env.GETSTREAM_SECRET;
const ConnectionStatus = require('../constants/App');

module.exports.get = async (req, res) => {
    const result = {}
    try {
        const connections = await Models.UserConnection
            .find({
                $or: [{
                    user: req.params.user
                }, {
                    connected_user: req.params.user
                }],
                status: {
                    $in: [ConnectionStatus.USER_CONNECTION_PENDING, ConnectionStatus.USER_CONNECTION_ACCEPTED]
                }
            })
            .populate('connected_user')
            .populate('user')
            .exec();

        res.status(200);
        result.success = true;
        result.data = connections.map(c => ({
            _id: c._id,
            status: c.status,
            from: c.user._id,
            user: c.user._id.equals(req.params.user) ? c.connected_user : c.user
        }));

    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }

    res.send(result);
}

module.exports.show = async (req, res) => {
    const result = {}
    try {
        const connection = await Models.UserConnection.findOne({
                _id: req.params.id,
                user: req.params.user
            })
            .populate('connected_user')
            .exec();

        res.status(200);
        result.success = true;
        result.data = connection;

    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }
    res.send(result);
}

module.exports.create = async (req, res) => {
    const result = {};
    let error_message = null;

    req.body.user = req.params.user;

    Models.UserConnection.create(req.body, async (error, connection) => {
        if (!error) {
            try {
                await Models.User.findByIdAndUpdate(connection.user, {
                    $addToSet: {
                        connections: connection._id
                    }
                });

                res.status(200);
                result.success = true;
                result.data = connection;

            } catch (error) {
                error_message = error.message;
            }
        } else {
            error_message = error.message;
        }

        if (error_message) {
            res.status(500);
            result.error = error_message;
            result.success = false;
        }

        res.send(result);
    });
}

module.exports.update = async (req, res) => {
    const result = {};
    try {
        const client = stream.connect(STREAM_KEY, STREAM_SECRET);
        const connection = await Models.UserConnection.findOneAndUpdate({
            connected_user: req.params.user,
            _id: req.params.id
        }, {
            status: req.body.status
        }, {
            returnOriginal: false
        });

        /** notify the connected user that someone sent a connection request */
        if (connection.status === ConnectionStatus.USER_CONNECTION_PENDING) {
            await client.feed('notifications', connection.connected_user).addActivity({
                actor: await client.user(connection.user._id).get(),
                verb: `connection_${ConnectionStatus.USER_CONNECTION_PENDING}`,
                object: await client.collections.add('user_connection', null, {
                    connection: connection._id,
                    message: `${connection.user.full_name} sent you a connection request.`,
                    link: `profile/${connection.user._id}`
                }),
            });
        }

        if (connection.status === ConnectionStatus.USER_CONNECTION_ACCEPTED) {
            /** follow the feed of the connected user */
            await client.feed('users', connection.user).follow('users', connection.connected_user);
            await client.feed('users', connection.connected_user).follow('users', connection.user);

            /** notify the initiating user that the connection request has been accepted */
            await client.feed('notifications', connection.user).addActivity({
                actor: await client.user(connection.connected_user._id).get(),
                verb: `connection_${ConnectionStatus.USER_CONNECTION_ACCEPTED}`,
                object: await client.collections.add('user_connection', null, {
                    connection: connection._id,
                    message: `${connection.connected_user.full_name} accepted your connection request.`,
                    link: `profile/${connection.connected_user._id}`
                }),
            });
        }

        res.status(200);
        result.success = true;
        result.data = connection;
    } catch (error) {
        res.status(500);
        result.error = error.message;
        result.success = false;
    }

    res.send(result);
}

module.exports.delete = async (req, res) => {
    await Models.User.findByIdAndUpdate(req.params.user, {
        $pull: {
            connections: req.params.id
        }
    });

    Models.UserConnection.findByIdAndDelete(req.params.id, async (err, connection) => {
        const client = stream.connect(STREAM_KEY, STREAM_SECRET);
        const user_feed = client.feed('users', connection.user);
        const connecting_feed = client.feed('users', connection.connected_user);

        await user_feed.unfollow('users', connection.connected_user.toString());
        await connecting_feed.unfollow('users', connection.user.toString());

        res.status(200).send();
    });
}
