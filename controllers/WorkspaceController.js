const Models = require('../models');

module.exports.get = async (req, res) => {
    const result = {};
    const workspaces = await Models.Workspace.find({})
        .populate('members')
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspaces;

    res.send(result);
};

module.exports.show = async (req, res) => {
    const result = {};
    const workspace = await Models.Workspace.findOne({
        _id: req.params.id
    })
        .populate('members')
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspace;
    res.send(result);
};

module.exports.createWorkspace = async (req, res) => {
    Models.Workspace.create(req.body, async (error, workspace) => {
        if (error) {
            res.send({ success: false, error: error });
        } else {
            res.send({ success: true, data: workspace });
        }
    });
};

module.exports.update = async (req, res) => {
    const workspace = await Models.Workspace.findByIdAndUpdate(req.params.id, req.body);
    res.send({
        success:true,
        data: workspace
    });
};

module.exports.delete = async (req, res) => {
    Models.Workspace.findOneAndDelete({
        _id: req.params.id
    }, async (err, workspace) => {
        await Models.User.findByIdAndUpdate(req.params.user, {
            $pull: {
                workspaces: req.params.id
            }
        });
        res.status(200).send();
    });
};

module.exports.getUserWorkspace = async (req, res) => {
    const result = {};
    const workspaces = await Models.Workspace.find({
        owner: req.params.user
    })
        .populate('members')
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspaces;

    res.send(result);
};

module.exports.showUserWorkspace = async (req, res) => {
    const result = {};
    const workspace = await Models.Workspace.findOne({
        _id: req.params.id,
        owner: req.params.user
    })
        .populate('members')
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspace;
    res.send(result);
};

module.exports.updateUserWorkspace = async (req, res) => {
    const result = {};

    await Models.Workspace.findOneAndUpdate({
        owner: req.params.user,
        _id: req.params.id
    }, {
        title: req.body.title,
        $addToSet: {
            notes: req.body.notes
        },
        $addToSet: {
            achievements: req.body.achievements
        }
    });

    const workspace = await Models.Workspace.findOne({
        _id: req.params.id,
        owner: req.params.user
    })
        .populate('members')
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspace;

    res.send(result);
};

module.exports.deleteUserWorkspace = async (req, res) => {
    const result = {};
    const delete_result = await Models.Workspace.deleteOne({
        _id: req.params.id,
        owner: req.params.user
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
};
