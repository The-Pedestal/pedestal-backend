const ConnectionUtil = require("../utils/Connections.js");
const MentorshipController = require("../controllers/MentorshipController");

module.exports.init = async (app) => {
    ConnectionUtil.connect();

    app.get("/mentorships", MentorshipController.get);
    app.get("/mentorships/:id", MentorshipController.show);
    app.post("/mentorships", MentorshipController.create);
    app.put("/mentorships/:id", MentorshipController.update);
    app.delete("/mentorships/:id", MentorshipController.delete);

    app.post("/mentorships/:id/answer", MentorshipController.answerEngagementQuestions);
};
