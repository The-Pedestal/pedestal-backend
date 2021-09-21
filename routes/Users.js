const ConnectionUtil = require("../utils/Connections.js");
const WorkspaceController = require("../controllers/WorkspaceController");
const UserController = require("../controllers/UserController");
const UserConnectionController = require("../controllers/UserConnectionController");
const UserExperienceController = require("../controllers/UserExperienceController");
const UserEducationController = require("../controllers/UserEducationController");
const UserProjectController = require("../controllers/UserProjectController");
const MentorshipController = require("../controllers/MentorshipController");
const UserActivitiesController = require("../controllers/UserActivitiesController");

module.exports.init = async (app) => {
    ConnectionUtil.connect();

    app.get("/users", UserController.get);
    app.get("/users/:id", UserController.show);
    app.post("/users", UserController.create);
    app.put("/users/:id", UserController.update);
    app.delete("/users/:id", UserController.delete);

    app.get("/users/:id/suggest", UserController.suggestConnectionToUser);

    /** experience */
    app.get("/users/:user/experiences", UserExperienceController.get);
    app.get("/users/:user/experiences/:id", UserExperienceController.show);
    app.post("/users/:user/experiences", UserExperienceController.create);
    app.put("/users/:user/experiences/:id", UserExperienceController.update);
    app.delete("/users/:user/experiences/:id", UserExperienceController.delete);

    /** projects */
    app.get("/users/:user/projects", UserProjectController.get);
    app.get("/users/:user/projects/:id", UserProjectController.show);
    app.post("/users/:user/projects", UserProjectController.create);
    app.put("/users/:user/projects/:id", UserProjectController.update);
    app.delete("/users/:user/projects/:id", UserProjectController.delete);

    /** education */
    app.get("/users/:user/educations", UserEducationController.get);
    app.get("/users/:user/educations/:id", UserEducationController.show);
    app.post("/users/:user/educations", UserEducationController.create);
    app.put("/users/:user/educations/:id", UserEducationController.update);
    app.delete("/users/:user/educations/:id", UserEducationController.delete);

    /** connections */
    app.get("/users/:user/connections", UserConnectionController.get);
    app.get("/users/:user/connections/:id", UserConnectionController.show);
    app.post("/users/:user/connections", UserConnectionController.create);
    app.put("/users/:user/connections/:id", UserConnectionController.update);
    app.delete("/users/:user/connections/:id", UserConnectionController.delete);

    /** workspace */
    app.get("/users/:user/workspaces", WorkspaceController.getUserWorkspace);
    app.get("/users/:user/workspaces/:id", WorkspaceController.showUserWorkspace);
    app.post("/users/:user/workspaces", WorkspaceController.createUserWorkspace);
    app.put("/users/:user/workspaces/:id", WorkspaceController.updateUserWorkspace);
    app.delete("/users/:user/workspaces/:id", WorkspaceController.deleteUserWorkspace);

    /** mentorship */
    app.get("/users/:user/mentors", MentorshipController.getUserMentors);
    app.get("/users/:user/mentors/:mentor", MentorshipController.showUserMentors);
    app.get("/users/:user/mentees", MentorshipController.getUserMentees);
    app.get("/users/:user/mentees/:mentee", MentorshipController.showUserMentees);

    /** activities */
    app.post("/users/:user/activities", UserActivitiesController.create);
    app.put("/users/:user/activities/:id", UserActivitiesController.update);
    app.delete("/users/:user/activities/:id", UserActivitiesController.delete);
};
