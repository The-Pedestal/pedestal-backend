const Models = require("../models");

//get all reviews the reviewer created
module.exports.getUserReviews = async (req, res) => {
    res.send({
        success: true,
        data: await Models.UserReview.find({
            reviewer: req.params.reviewer,
        }),
    });
};

//get an individual review that the reviewer created
module.exports.showUserReview = async (req, res) => {
    const result = {};
    try {
        const review = await Models.UserReview.findOne({
            //review id for specific review
            _id: req.params.id,
            reviewer: req.params.reviewer,
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

//create a new review
module.exports.createUserReview = async (req, res) => {
    const result = {};
    let error_message = null;
    Models.UserReview.create(req.body, async (error, review) => {
        if (!error) {
            try {
                await Models.UserReview.create({
                    reviewer: req.params.reviewer,
                    reviewee: req.body.reviewee,
                    rating: req.body.ratings,
                    title: req.body.title,
                    content: req.body.content,
                    mentorship: req.body.mentorship,
                });

                res.status(200);
                result.success = true;
                result.data = review;
            } catch (error) {
                error_message = error.message;
            }
        } else {
            error_message = error.message;
        }
        if (error_message) {
            res.status(500);
            result.error = error_message;
            result.success = false;
        }
        res.send(result);
    });
};
