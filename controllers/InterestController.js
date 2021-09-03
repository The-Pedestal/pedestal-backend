const Models = require('../models');

module.exports.get = async (req, res) => {
    const result = {};
    try {
        const interests = await Models.Interest.find({});
        res.status(200);
        result.success = true;
        result.data = interests;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }
    res.send(result);
}

module.exports.show = async (req, res) => {
    const result = {};
    try {
        const interest = await Models.Interest.findById(req.params.id);
        res.status(200);
        result.success = true;
        result.data = interest;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }
    res.send(result);
}

module.exports.create = async (req, res) => {
    const result = {};
    Models.Interest.create(req.body, (err, interest) => {
        try {
            if (err) {
                throw err.message;
            }
            res.status(200);
            result.success = true;
            result.data = interest;
        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }
        res.send(result);
    });
}

module.exports.update = async (req, res) => {
    const result = {};
    try {
        const interest = await Models.Interest.findByIdAndUpdate(req.params.id, req.body, {
            returnOriginal: false
        });

        res.status(200);

        result.success = true;
        result.data = interest
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }

    res.send(result);
}

module.exports.delete = async (req, res) => {
    res.send({});
}