const Models = require('../models');

module.exports.get = async (req, res) => {
    const result = {};
    const workspace = await Models.Workspace.findOne({
            _id: req.params.workspace,
        })
        .select('achievements')
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspace ? workspace.achievements : null;

    res.send(result);
}

module.exports.show = async (req, res) => {
    let achievement = null;
    const result = {};
    const workspace = await Models.Workspace.findOne({
            _id: req.params.workspace,
            'achievements._id': req.params.id,
        })
        .select('achievements')
        .populate('achievements.achievement')
        .exec();

    if (workspace) {
        achievement = workspace.achievements
            .find(a => req.params.id === a._id.toString());
    };

    res.status(200);
    result.success = true;
    result.data = achievement

    res.send(result);
}

module.exports.create = async (req, res) => {
    const result = {};
    await Models.Workspace.findOneAndUpdate({
        _id: req.params.workspace
    }, {
        $addToSet: {
            achievements: req.body.achievements
        }
    });

    const workspace = await Models.Workspace.findOne({
            _id: req.params.workspace,
        })
        .populate('achievements.achievement')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspace.achievements;

    res.send(result);
}

module.exports.update = async (req, res) => {
    const result = {};
    Models.Workspace.updateOne({
        _id: req.params.workspace,
        'achievements._id': req.params.id
    }, {
        $set: {
            'achievements.$.progress': req.body.progress,
        }
    }, async (err) => {
        const workspace = await Models.Workspace.findOne({
                _id: req.params.workspace,
                'achievements._id': req.params.id
            })
            .populate('achievements.achievement')
            .exec();

        res.status(200);
        result.success = true;
        result.data = workspace.achievements;

        res.send(result);
    });
}

module.exports.delete = async (req, res) => {
    Models.Workspace.updateOne({
        _id: req.params.workspace,
        'achievements._id': req.params.id
    }, {
        $pull: {
            'achievements': {
                _id: req.params.id
            },
        }
    });

    res.status(200).send();
}