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
const MentorDetail = require("./schemas/MentorDetail.js");

module.exports = {
    Achievement: mongoose.model("achievement", AchievementSchema),
    Interest: mongoose.model("interest", InterestSchema),
    MentorDetail: mongoose.model("mentor_detail", MentorDetail),
    Mentorship: mongoose.model("mentorship", MentorshipSchema),
    Transaction: mongoose.model("transaction", TransactionSchema),
    User: mongoose.model("user", UserSchema),
    UserActivity: mongoose.model("user_activity", UserActivitySchema),
    UserConnection: mongoose.model("user_connection", UserConnectionSchema),
    UserEducation: mongoose.model("user_education", UserEducationSchema),
    UserExperience: mongoose.model("user_experience", UserExperienceSchema),
    UserProject: mongoose.model("user_project", UserProjectSchema),
    UserReview: mongoose.model("user_review", UserReviewSchema),
    Workspace: mongoose.model("workspace", WorkspaceSchema),
    WorkspaceSchedule: mongoose.model("workspace_schedule", WorkspaceScheduleSchema),
};
