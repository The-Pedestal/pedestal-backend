const Models = require('../models');

module.exports.get = async (req, res) => {
    const result = {};
    const { user } = req.params;
    const filter = user ? { mentor: user } : {};

    const workspaces = await Models.Workspace.find(filter)
        .populate('mentees')
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspaces;

    res.send(result);
}

module.exports.show = async (req, res) => {
    const { id, user } = req.params;
    const filter = { _id: id };
    const result = {};

    if (user) {
        filter.user = user;
    }

    const workspace = await Models.Workspace
        .findOne(filter)
        .populate('mentees')
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspace;

    res.send(result);
}

module.exports.create = async (req, res) => {
    const result = {};
    Models.Workspace.create({
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
}

module.exports.update = async (req, res) => {
    const result = {};
    const workspace = await Models.Workspace.findOneAndUpdate({
        _id: req.params.id
    }, {
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
}

module.exports.delete = async (req, res) => {
    Models.Workspace
    .findOneAndDelete({_id: req.params.id }, async (err, workspace) => {
        await Models.User.findByIdAndUpdate(workspace.mentor, {
            $pull: {
                workspaces: workspace._id
            }
        });
        res.status(204).send();
    });
}