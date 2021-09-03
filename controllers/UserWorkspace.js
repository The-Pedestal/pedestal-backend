const Models = require('../models')
const { connect } = require('../utils/Connections.js');

module.exports.init = async (express) => {
    await connect();

    express.get('/users/:user/workspaces', async (req, res) => {
        const result = {};
        const workspaces = await Models.Workspace.find({
            mentor: req.params.user
        })
        .populate('mentees')
        .populate('achievements.achievement')
        .exec();

        res.status(200);
        result.success = true;
        result.data = workspaces;

        res.send(result);
    });

    express.get('/users/:user/workspaces/:id', async (req, res) => {
        const result = {};
        const workspace = await Models.Workspace.findOne({
            _id: req.params.id,
            mentor: req.params.user
        })
        .populate('mentees')
        .populate('achievements.achievement')
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
            const new_workspace = await Models.Workspace.findById(workspace._id)
                .populate('mentees')
                .populate('achievements.achievement')
                .exec();

            res.status(200);
            result.success = true;
            result.data = new_workspace;

            res.send(result);
        });
    });

    express.put('/users/:user/workspaces/:id', async (req, res) => {
        const result = {};
        const workspace = await Models.Workspace.findOneAndUpdate({
            mentor: req.params.user,
            _id: req.params.id
        }, {
            mentor: req.params.user, //make sure that the mentor will not be replaced
            title: req.body.title,
            $addToSet: {
                notes: req.body.notes
            },
            $addToSet: {
                achievements: req.body.achievements
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
        const delete_result = await Models.Workspace.deleteOne({
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
