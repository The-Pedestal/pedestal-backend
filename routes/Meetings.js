const ConnectionUtil = require("../utils/Connections.js");
const MeetingController = require("../controllers/MeetingController");

module.exports.init = async (app) => {

    ConnectionUtil.connect();

    app.post("/meetings", MeetingController.createMeeting);
    app.get("/meetings/auth", MeetingController.getAuthenticationToken);
};
