const Models = require('../models');
const AppConstants = require('../constants/App');

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

module.exports.updateAgreementStatus = async (req, res) => {
    const result = {};
    const user_id = req.params.user;
    const status = req.body.status;
    const mentorship_id = req.params.id;
    const mentorship = await Models.Mentorship.findOne({
        _id: mentorship_id
    });

    switch (true) {
        case mentorship.mentee.equals(user_id):
            mentorship.mentee_agreement_status = status;
            break;
        case mentorship.mentor.equals(user_id):
            mentorship.mentor_agreement_status = status;
            break;
        default:
            throw 'user is not in this mentorship program'
            break;
    }

    if (mentorship.mentor_agreement_status === AppConstants.MENTOR_AGREEMENT_ACCEPTED &&
        mentorship.mentee_agreement_status === AppConstants.MENTEE_AGREEMENT_ACCEPTED) {
        mentorship.status = AppConstants.MENTORSHIP_ACCEPTED;
    }

    if (mentorship.mentor_agreement_status === AppConstants.MENTOR_AGREEMENT_PENDING ||
        mentorship.mentee_agreement_status === AppConstants.MENTEE_AGREEMENT_PENDING) {
        mentorship.status = AppConstants.MENTORSHIP_PENDING;
    }

    if (mentorship.mentor_agreement_status === AppConstants.MENTOR_AGREEMENT_DECLINED ||
        mentorship.mentee_agreement_status === AppConstants.MENTEE_AGREEMENT_DECLINED) {
        mentorship.status = AppConstants.MENTORSHIP_DECLINED;
    }

    const updated_mentorship = await mentorship.save();

    result.success = true;
    result.data = updated_mentorship;

    res.send(result);
}

module.exports.updateMentorAgreementStatus = async (req, res) => {
    const result = {};
    const mentorship = await Models.Mentorship.findOneAndUpdate({
        mentor: req.params.user,
        mentee: req.params.mentee,
        _id: req.params.id
    }, {
        mentor_agreement_status: req.body.mentor_agreement_status,
    }, {
        returnOriginal: false
    });

    result.success = true;
    result.data = mentorship;

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
    /** moved this to per user requests */
    res.send();
}

module.exports.delete = async (req, res) => {
    res.send();
}
