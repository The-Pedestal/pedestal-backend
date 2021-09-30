const Models = require('../models');
const stream = require('getstream');
const AppConstants = require('../constants/App');
const STREAM_KEY = process.env.GETSTREAM_KEY;
const STREAM_SECRET = process.env.GETSTREAM_SECRET;
const getstream_client = stream.connect(STREAM_KEY, STREAM_SECRET);

module.exports.getUserMentors = async (req, res) => {
    const result = {};
    const mentors = await Models.Mentorship.find({
        mentee: req.params.user,
    })
        .populate('mentor')
        .exec();

    res.status(200);
    result.success = true;
    result.data = mentors;

    res.send(result);
};

module.exports.showUserMentor = async (req, res) => {
    const result = {};
    const mentors = await Models.Mentorship.findOne({
        mentor: req.params.mentor,
        mentee: req.params.user,
    })
        .populate('mentor')
        .exec();

    res.status(200);
    result.success = true;
    result.data = mentors;

    res.send(result);
};

module.exports.getUserMentees = async (req, res) => {
    const result = {};
    const mentors = await Models.Mentorship.find({
        mentor: req.params.user,
    })
        .populate('mentee')
        .exec();

    res.status(200);
    result.success = true;
    result.data = mentors;

    res.send(result);
};

module.exports.showUserMentee = async (req, res) => {
    const result = {};
    const mentees = await Models.Mentorship.findOne({
        mentee: req.params.mentee,
        mentor: req.params.user,
    })
        .populate('mentee')
        .exec();

    res.status(200);
    result.success = true;
    result.data = mentees;

    res.send(result);
};

module.exports.get = async (req, res) => {
    const result = {};
    try {
        const mentorships = await Models.Mentorship.find({}).populate('mentor').populate('mentee').exec();

        res.status(200);
        result.success = true;
        result.data = mentorships;
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
};

module.exports.updateMentorshipAgreementStatus = async (req, res) => {
    const result = {};
    const mentorship = await Models.Mentorship.findOneAndUpdate(
        {
            mentor: req.params.user,
            mentee: req.params.mentee,
            _id: req.params.id,
        },
        {
            mentor_agreement_status: req.body.mentor_agreement_status,
        },
        {
            returnOriginal: false,
        },
    );

    result.success = true;
    result.data = mentorship;

    res.send(result);
};

module.exports.create = async (req, res) => {
    const result = {};
    const user = req.body.user;
    const applying_as = req.body.as;
    const applying_to = req.body.to;
    const new_mentorship = {
        applicant: user,
        mentor: null,
        mentee: null,
    };

    /** apply the '@var user' as either mentor or mentee */
    switch (applying_as) {
        case AppConstants.MENTOR:
            new_mentorship.mentor = user;
            new_mentorship.mentee = applying_to;
            /** accept the agreement status of the applicant */
            new_mentorship.mentor_agreement_status = AppConstants.MENTOR_AGREEMENT_ACCEPTED;
            break;
        case AppConstants.MENTEE:
            new_mentorship.mentor = applying_to;
            new_mentorship.mentee = user;
            /** accept the agreement status of the applicant */
            new_mentorship.mentee_agreement_status = AppConstants.MENTEE_AGREEMENT_ACCEPTED;
            break;
        default:
            throw "can't failed to identify applicant role";
    }

    Models.Mentorship.create(new_mentorship, async (error, mentorship) => {
        try {
            res.status(200);
            result.success = true;
            result.data = mentorship;
        } catch (err) {
            res.status(500);
            result.success = false;
            result.error = err.message;
        }
        res.send(result);
    });
};

module.exports.update = async (req, res) => {
    const result = {};
    const user = req.body.user;
    const role = req.body.role;
    const mentorship = await Models.Mentorship.findOne({
        _id: req.params.id,
        ...(role === AppConstants.MENTOR && {
            mentor: user,
        }),
        ...(role === AppConstants.MENTEE && {
            mentee: user,
        }),
    });

    switch (role) {
        case AppConstants.MENTOR:
            mentorship.mentor_agreement_status = req.body.agreement_status;
            break;
        case AppConstants.MENTEE:
            mentorship.mentee_agreement_status = req.body.agreement_status;
            break;
        default:
            throw "can't failed to identify the user's role";
    }

    if (
        mentorship.mentor_agreement_status === AppConstants.MENTOR_AGREEMENT_ACCEPTED &&
        mentorship.mentee_agreement_status === AppConstants.MENTEE_AGREEMENT_ACCEPTED
    ) {
        mentorship.status = AppConstants.MENTORSHIP_ACCEPTED;
    }

    if (
        mentorship.mentor_agreement_status === AppConstants.MENTOR_AGREEMENT_PENDING ||
        mentorship.mentee_agreement_status === AppConstants.MENTEE_AGREEMENT_PENDING
    ) {
        mentorship.status = AppConstants.MENTORSHIP_PENDING;
    }

    if (
        mentorship.mentor_agreement_status === AppConstants.MENTOR_AGREEMENT_DECLINED ||
        mentorship.mentee_agreement_status === AppConstants.MENTEE_AGREEMENT_DECLINED
    ) {
        mentorship.status = AppConstants.MENTORSHIP_DECLINED;
    }

    await mentorship.save();

    result.success = true;
    result.data = mentorship;

    res.send(result);
};

module.exports.delete = async (req, res) => {
    res.send();
};
