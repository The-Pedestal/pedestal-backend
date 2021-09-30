const Models = require("../models");

//reviewees can see all their reviews about them and get an indiviual review

//get all reviews about the user
module.exports.getUserReviews = async (req, res) => {
    res.send({
        success: true,
        data: await Models.UserReview.find({
            reviewee: req.params.reviewee,
        }),
    });
};

//get an individual review that is about the reviewee
module.exports.showReview = async (req, res) => {
    const result = {};
    try {
        const review = await Models.UserReview.findOne({
            //review id for specific review
            _id: req.params.id,
            reviewee: req.params.reviewee,
        });

        res.status(200);
        result.success = true;
        result.data = review;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }

    res.send(result);
};

//reviewee can't create an review about themselves
