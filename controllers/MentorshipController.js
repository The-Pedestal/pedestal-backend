const Models = require('../models');

module.exports.getUserMentors = async (req, res) => {
    const result = {}
    const mentors = await Models.Mentorship.find({
        mentee: req.params.user
    })
    .populate('mentor')
    .exec();

    res.status(200);
    result.success = true;
    result.data = mentors;

    res.send(result);
}

module.exports.showUserMentors = async (req, res) => {
    const result = {}
    const mentors = await Models.Mentorship.findOne({
        mentor: req.params.mentor,
        mentee: req.params.user
    })
    .populate('mentor')
    .exec();

    res.status(200);
    result.success = true;
    result.data = mentors;

    res.send(result);
}

module.exports.getUserMentees = async (req, res) => {
    const result = {}
    const mentors = await Models.Mentorship.find({
        mentor: req.params.user
    })
    .populate('mentee')
    .exec();

    res.status(200);
    result.success = true;
    result.data = mentors;

    res.send(result);
}

module.exports.showUserMentees = async (req, res) => {
    const result = {}
    const mentees = await Models.Mentorship.findOne({
        mentee: req.params.mentee,
        mentor: req.params.user
    })
    .populate('mentee')
    .exec();

    res.status(200);
    result.success = true;
    result.data = mentees;

    res.send(result);
}

module.exports.get = async (req, res) => {
    const result = {}
    try {
        const mentorships = await Models.Mentorship.find({})
        .populate('mentor')
        .populate('mentee')
        .exec();

        res.status(200);
        result.success = true;
        result.data = mentorships;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }

    res.send(result);
}

module.exports.show = async (req, res) => {
    const result = {}
    try {
        const mentorship = await Models.Mentorship.findOne({
                _id: req.params.id,
            })
            .populate('mentor')
            .populate('mentee')
            .exec();

        res.status(200);
        result.success = true;
        result.data = mentorship;

    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }
    res.send(result);
}

module.exports.create = async (req, res) => {
    const result = {};
    Models.Mentorship.create(req.body, async (error, mentorship) => {
        try {
            res.status(200);
            result.success = true;
            result.data = mentorship;
        } catch (err) {
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
        const mentorship = await Models.Mentorship.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            returnOriginal: false
        });

        res.status(200);
        result.success = true;
        result.data = mentorship;
    } catch (error) {
        res.status(500);
        result.error = error.message;
        result.success = false;
    }

    res.send(result);
}

module.exports.delete = async (req, res) => {
    res.send({});
}

