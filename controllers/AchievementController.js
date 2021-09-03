const Models = require('../models');

module.exports.get = async (req, res) => {
    const result = {};
    const achievements = await Models.Achievement.find({});

    res.status(200);

    result.success = true;
    result.data = achievements;

    res.send(result);
}

module.exports.show = async (req, res) => {
    const result = {};
    const achievement = await Models.Achievement.findById(req.params.id);

    res.status(200);

    result.success = true;
    result.data = achievement;

    res.send(result);
}

module.exports.create = async (req, res) => {
    const result = {};
    const achievement = await Models.Achievement.create(req.body);

    res.status(200);

    result.success = true;
    result.data = achievement;

    res.send(result);
}

module.exports.update = async (req, res) => {
    const result = {};
    const achievement = await Models.Achievement.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        returnOriginal: false
    });

    res.status(200);

    result.success = true;
    result.data = achievement;

    res.send(result);
}

module.exports.delete = async (req, res) => {
    res.send({});
}
