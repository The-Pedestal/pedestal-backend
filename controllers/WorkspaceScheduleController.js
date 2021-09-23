const Models = require('../models');

module.exports.get = async (req, res) => {
    const result = {};
    const workspaces = await Models.Workspace.find({
            _id: req.params.workspace
        })
        .select('schedules')
        .populate('schedules.schedule')
        .exec();

    res.status(200);
    result.success = true;
    result.data = workspaces ? workspace.schedules : null;

    res.send(result);
}

module.exports.show = async (req, res) => {
    let schedules = null;
    const result = {};
    const workspaces = await Models.Workspace.find({
            _id: req.params.workspace
        })
        .select('schedules')
        .populate('schedules.schedule')
        .exec();
    if (workspace) {
        schedules = workspace.schedules
            .find(a => req.params.id === a._id.toString());
    };

    res.status(200);
    result.success = true;
    result.data = schedules;

    res.send(result);
}

module.exports.create = async (req, res) => {
    const result = {};
    Models.WorkspaceSchedule.create(req.body, async (err, schedule) => {
        await Models.Workspace.findOneAndUpdate({
            _id: req.params.Workspace
        }, {
            $addToSet: {
                schedules: schedule._id
            }
        });

        res.status(200);
        result.success = true;
        result.data = schedule;

        res.send(result);
    });
}

module.exports.update = async (req, res) => {
    Models.WorkspaceSchedule.updateOne({
        _id: req.params.id
    }, {
        title: req.body.title,
        description: req.body.description,
        start_at: req.body.start_at,
        end_at: req.body.end_at
    }, async (error) => {
        const workspace = await Models.Workspace.findOne({
                _id: req.params.workspace
            })
            .populate('schedules.schedule')
            .exec();

        res.status(200);
        result.success = true;
        result.data = workspace.schedules;

        res.send(result);
    });
}

module.exports.delete = async (req, res) => {}
