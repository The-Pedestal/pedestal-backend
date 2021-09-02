const Models = require('../models/models.js')
const { connect } = require('../utils/Connections.js');

module.exports.init = async (express) => {
    await connect();

    express.get('/users/:user/workspaces', async (req, res) => {
        const result = {};
        const workspaces = await Models.UserWorkspace.find({
            mentor: req.params.user
        })
        .populate('mentees')
        .exec();

        res.status(200);
        result.success = true;
        result.data = workspaces;

        res.send(result);
    });

    express.get('/users/:user/workspaces/:id', async (req, res) => {
        const result = {};
        const workspace = await Models.UserWorkspace.findOne({
            _id: req.params.id,
            mentor: req.params.user
        })
        .populate('mentees')
        .exec();

        res.status(200);
        result.success = true;
        result.data = workspace;
        res.send(result);
    });

    express.post('/users/:user/workspaces', async (req, res) => {
        const result = {};
        Models.UserWorkspace.create({
            ...req.body,
            mentor: req.params.user,
        }, async (error, workspace) => {

            /**
             * @TODO
             * add a getstream feed for each workspace
             */
            await Models.User.findByIdAndUpdate(req.params.user, {
                $addToSet: {
                    workspaces: workspace._id
                }
            });
            const new_workspace = await Models.UserWorkspace.findById(workspace._id)
                .populate('mentees')
                .exec();

            res.status(200);
            result.success = true;
            result.data = new_workspace;

            res.send(result);
        });
    });

    express.put('/users/:user/workspaces/:id', async (req, res) => {
        const result = {};
        const workspace = await Models.UserWorkspace.findOneAndUpdate({
            mentor: req.params.user,
            _id: req.params.id
        }, {
            mentor: req.params.user, //make sure that the mentor will not be replaced
            title: req.body.title,
            $addToSet: {
                notes: req.body.notes
            }
        }, {
            returnOriginal: false
        });

        res.status(200);
        result.success = true;
        result.data = workspace;

        res.send(result);
    });

    express.delete('/users/:user/workspaces/:id', async (req, res) => {
        const result = {};
        const delete_result = await Models.UserWorkspace.deleteOne({
            _id: req.params.id,
            mentor: req.params.user
        });

        await Models.User.findByIdAndUpdate(req.params.user, {
            $pull: {
                workspaces: req.params.id
            }
        });

        res.status(200);
        result.success = true;
        result.data = {
            count: delete_result.deletedCount
        };

        res.send(result);
    });
}
