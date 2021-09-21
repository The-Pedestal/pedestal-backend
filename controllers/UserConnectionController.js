const Models = require('../models')
const stream = require('getstream');
const STREAM_KEY = process.env.GETSTREAM_KEY;
const STREAM_SECRET = process.env.GETSTREAM_SECRET;
const ConnectionStatus = require('../constants/App');
const gs_client = stream.connect(STREAM_KEY, STREAM_SECRET);

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
    const {
        connected_user
    } = req.body;
    const {
        user
    } = req.params;

    const actor = await Models.User.findOne({
        _id: user
    });

    Models.UserConnection.create({
        connected_user,
        user
    }, async (error, connection) => {
        /** notify the connected user that someone sent a connection request */
        await gs_client.feed('notifications', connected_user).addActivity({
            actor: await gs_client.user(actor._id).get(),
            verb: `connection_${ConnectionStatus.USER_CONNECTION_PENDING}`,
            object: await gs_client.collections.add('user_connection', null, {
                connection: connection._id,
                message: `${actor.full_name} sent you a connection request.`,
                link: `profile/${actor._id}`
            }),
        });

        res.status(200);
        res.send({
            success: true,
            data: connection
        });
    });
}

module.exports.update = async (req, res) => {
    const result = {};
    try {
        const connection = await Models.UserConnection.findOneAndUpdate({
                user: req.params.user,
                _id: req.params.id
            }, {
                status: req.body.status
            }, {
                returnOriginal: false
            })
            .populate('connected_user')
            .exec();

        if (connection.status === ConnectionStatus.USER_CONNECTION_ACCEPTED) {
            /** follow the feed of the connected user */
            await gs_client.feed('users', connection.user).follow('users', connection.connected_user._id);
            await gs_client.feed('users', connection.connected_user._id).follow('users', connection.user);

            /** receive notifications when the connected user creates an activity  */
            await gs_client.feed('notifications', connection.user).follow('users', connection.connected_user._id);

            /** notify the initiating user that the connection request has been accepted */
            await gs_client.feed('notifications', connection.user).addActivity({
                actor: await gs_client.user(connection.connected_user._id).get(),
                verb: `connection_${ConnectionStatus.USER_CONNECTION_ACCEPTED}`,
                object: await gs_client.collections.add('user_connection', null, {
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
