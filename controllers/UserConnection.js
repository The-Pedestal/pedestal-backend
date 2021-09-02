const {
    connect
} = require('../utils/Connections.js');
const stream = require('getstream');
const Models = require('../models/models.js')

module.exports.init = async (express) => {

    await connect();

    express.get('/users/:user/connections', async (req, res) => {
        const result = {}
        try {
            const user = await Models.User.findOne({
                _id: req.params.user
            })
            .populate({
                path: 'connections',
                populate: {
                    path: 'connected_user'
                }
            })
            .exec();

            res.status(200);
            result.success = true;
            result.data = user.connections;

        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }

        res.send(result);
    });

    express.get('/users/:user/connections/:id', async (req, res) => {
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
    });

    express.post('/users/:user/connections', async (req, res) => {

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

    });

    express.put('/users/:user/connections/:id', async (req, res) => {
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
    });

    express.delete('/users/:user/connections/:id', async (req, res) => {
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
    });
}