const InterestSchema = require("./schemas/Interest.js");
const mongoose = require("mongoose");
const UserConnectionSchema = require("./schemas/UserConnection.js");
const UserExperienceSchema = require("./schemas/UserExperience.js");
const UserSchema = require("./schemas/User.js");
const UserEducationSchema = require("./schemas/UserEducation.js");
const UserProjectSchema = require("./schemas/UserProject.js");
const UserReviewSchema = require("./schemas/UserReview.js");
const WorkspaceSchema = require("./schemas/Workspace.js");
const AchievementSchema = require("./schemas/Achievement.js");
const MentorshipSchema = require("./schemas/Mentorship.js");
const WorkspaceScheduleSchema = require("./schemas/WorkspaceSchedule");
const UserActivitySchema = require("./schemas/UserActivity");
const TransactionSchema = require("./schemas/Transaction.js");

module.exports = {
    UserEducation: mongoose.model("user_education", UserEducationSchema),
    UserProject: mongoose.model("user_project", UserProjectSchema),
    Achievement: mongoose.model("achievement", AchievementSchema),
    Interest: mongoose.model("interest", InterestSchema),
    UserReview: mongoose.model("user_review", UserReviewSchema),
    Mentorship: mongoose.model("mentorship", MentorshipSchema),
    User: mongoose.model("user", UserSchema),
    UserActivity: mongoose.model("user_activity", UserActivitySchema),
    UserConnection: mongoose.model("user_connection", UserConnectionSchema),
    UserExperience: mongoose.model("user_experience", UserExperienceSchema),
    Workspace: mongoose.model("workspace", WorkspaceSchema),
    WorkspaceSchedule: mongoose.model("workspace_schedule", WorkspaceScheduleSchema),
    Transaction: mongoose.model("transaction", TransactionSchema)
};
