const Models = require('../models')

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
                    $in: ['pending', 'connected']
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
                const user = await Models.User.findByIdAndUpdate(connection.user, {
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
        const connection = await Models.UserConnection.findOneAndUpdate({
            user: req.params.user,
            _id: req.params.id
        }, {
            status: req.body.status
        }, {
            returnOriginal: false
        });

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
    const result = {};
    try {
        const user = await Models.User.findByIdAndUpdate(req.params.user, {
            $pull: {
                connections: req.params.id
            }
        });
        const delete_result = await Models.UserConnection.deleteOne({
            _id: req.params.id
        });

        res.status(200);
        result.success = true;
        result.data = {
            count: delete_result.deletedCount
        };
    } catch (error) {
        res.status(500);
        result.error = error.message;
        result.success = false;
    }

    res.send(result);
}
