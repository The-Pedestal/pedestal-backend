const Models = require("../models");

module.exports.get = async (req, res) => {
    const result = {};
    try {
        const skills = await Models.Skill.find({});
        res.status(200);
        result.success = true;
        result.data = skills;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }
    res.send(result);
};

module.exports.show = async (req, res) => {
    const result = {};
    try {
        const Skill = await Models.Skill.findById(req.params.id);
        res.status(200);
        result.success = true;
        result.data = Skill;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }
    res.send(result);
};

module.exports.create = async (req, res) => {
    const result = {};
    Models.Skill.create(req.body, (err, Skill) => {
        try {
            if (err) {
                throw err.message;
            }
            res.status(200);
            result.success = true;
            result.data = Skill;
        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }
        res.send(result);
    });
};

module.exports.update = async (req, res) => {
    const result = {};
    try {
        const Skill = await Models.Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnOriginal: false,
            }
        );

        res.status(200);

        result.success = true;
        result.data = Skill;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }

    res.send(result);
};

module.exports.delete = async (req, res) => {
    res.send({});
};
