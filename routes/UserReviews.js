const ConnectionUtil = require("../utils/Connections.js");
UserRevieweeController = require("../controllers/UserRevieweeController");
UserReviewerController = require("../controllers/UserReviewerController");

module.exports.init = async (app) => {
    ConnectionUtil.connect();

    /** reviewer gets a list of reviews they made  */
    app.get("users/:reviewer/reviews", UserReviewerController.getUserReviews);
    /** reviewer gets a single review they made  */
    app.get("users/:reviewer/reviews/:id", UserReviewerController.showUserReview);
    /** reviewer creates a review  */
    app.post("users/:reviewer/reviews", UserReviewerController.createUserReview);
    /** reviewee (person being reviewed) get all their reviews */
    app.get("users/:reviewee/my-reviews", UserRevieweeController.getUserReviews);
    /** reviewee gets an individual review */
    app.get("users/:reviewee/my-reviews/:id", UserRevieweeController.showReview);
};
