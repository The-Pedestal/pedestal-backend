const Models = require('../models');
const stream = require('getstream');
const AppConstants = require('../constants/App');
const STREAM_KEY = process.env.GETSTREAM_KEY;
const STREAM_SECRET = process.env.GETSTREAM_SECRET;
const gs_client = stream.connect(STREAM_KEY, STREAM_SECRET);

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
    const user = req.body.mentee;
    const mentor_id = req.body.mentor;
    const new_mentorship = {
        applicant: user,
        mentor: mentor_id,
        mentee: user,
        status: AppConstants.MENTORSHIP_PENDING
    };
    const applicant = await Models.User.findById(user);
    const mentor = await Models.User.findById(mentor_id);

    if (mentor.is_opt_out_mentoring) {
        return res.status(500).send({
            success: false,
            error: 'mentor opted out of mentoring'
        });
    }

    Models.Mentorship.create(new_mentorship, async (error, mentorship) => {
        try {
            await gs_client.feed("notifications", mentor_id).addActivity({
                actor: await gs_client.user(user).get(),
                verb: `mentorship_request`,
                object: await gs_client.collections.add(
                    "mentorship",
                    null,
                    {
                        mentorship_id: mentorship._id,
                        message: `${applicant.full_name} ${!mentor.is_currently_mentoring
                            ? 'is requesting you to be their mentor'
                            : 'wants to book you as a mentor'}`,
                        link: `/mentorships`,
                    }
                ),
            });

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
    const status = req.body.status;
    const mentorship = await Models.Mentorship.findOne({ _id: req.params.id });
    const mentor = await Models.User.findById(mentorship.mentor);
    const old_status = mentorship.status;
    let message = `${mentor.full_name} `;

    mentorship.status = status;

    await mentorship.save();

    if (old_status != mentorship.status) {
        switch (mentorship.status) {
            case AppConstants.MENTORSHIP_ACCEPTED:
                message += 'has accepted to be your mentor';
                break;
            case AppConstants.MENTEE_AGREEMENT_DECLINED:
                message += 'has declined your mentor request';
                break;
        }

        await gs_client.feed("notifications", mentorship.mentee).addActivity({
            actor: await gs_client.user(mentorship.mentor).get(),
            verb: `mentorship_request`,
            object: await gs_client.collections.add(
                "mentorship",
                null,
                {
                    mentorship_id: mentorship._id,
                    message: message,
                    link: `/mentorships`,
                }
            ),
        });
    }

    result.success = true;
    result.data = mentorship;

    res.send(result);;
};

module.exports.delete = async (req, res) => {
    res.send();
};
