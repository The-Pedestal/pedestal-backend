const Models = require("../models");

module.exports.getMentorshipDetail = async (req, res) => {
    const { user } = req.params;
    const mentor_detail = await Models.MentorDetail.find({ user: user });

    res.send({
        success: true,
        data: mentor_detail
    });
};

module.exports.updateOrCreateMentorshipDetail = async (req, res) => {
    let new_mentor_detail = null;
    const { user } = req.params;
    const mentor_detail = await Models.MentorDetail.countDocuments({ user: user });

    if (Boolean(mentor_detail)) {
        new_mentor_detail = await Models.MentorDetail.findOneAndUpdate({ user: user }, req.body, { returnOriginal: false });
    } else {
        new_mentor_detail = await Models.MentorDetail.create({
            user: user,
            ...req.body
        });
        await Models.User.findByIdAndUpdate(user, { mentor_detail: new_mentor_detail }, {
            upsert: true
        });
    }

    res.send({
        success: true,
        data: new_mentor_detail
    });
};
