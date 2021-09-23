const InterestSchema = require("./schemas/Interest.js");
const mongoose = require("mongoose");
const UserConnectionSchema = require("./schemas/UserConnection.js");
const UserExperienceSchema = require("./schemas/UserExperience.js");
const UserSchema = require("./schemas/User.js");
const UserEducationSchema = require("./schemas/UserEducation.js");
const UserProjectSchema = require("./schemas/UserProject.js");
const WorkspaceSchema = require("./schemas/Workspace.js");
const AchievementsSchema = require("./schemas/Achievements.js");
const MentorshipSchema = require("./schemas/Mentorship.js");
const WorkspaceScheduleSchema = require("./schemas/WorkspaceSchedule");
const UserActivitySchema = require("./schemas/UserActivity");

module.exports = {
    UserEducation: mongoose.model("user_education", UserEducationSchema),
    UserProject: mongoose.model("user_project", UserProjectSchema),
    Achievement: mongoose.model("achievement", AchievementsSchema),
    Interest: mongoose.model("interest", InterestSchema),
    Mentorship: mongoose.model("mentorship", MentorshipSchema),
    User: mongoose.model("user", UserSchema),
    UserActivity: mongoose.model("user_activities", UserActivitySchema),
    UserConnection: mongoose.model("user_connection", UserConnectionSchema),
    UserExperience: mongoose.model("user_experience", UserExperienceSchema),
    Workspace: mongoose.model("workspace", WorkspaceSchema),
    WorkspaceSchedule: mongoose.model(
        "workspace_schedule",
        WorkspaceScheduleSchema
    ),
};
