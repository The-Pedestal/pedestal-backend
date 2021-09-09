const InterestSchema = require('./schemas/Interest.js');
const mongoose = require('mongoose');
const UserConnectionSchema = require('./schemas/UserConnection.js');
const UserExperienceSchema = require('./schemas/UserExperience.js');
const UserSchema = require('./schemas/User.js');
const WorkspaceSchema = require('./schemas/Workspace.js');
const AchievementsSchema = require('./schemas/Achievements.js');
const MentorshipSchema = require('./schemas/Mentorship.js');
const WorkspaceScheduleSchema = require('./schemas/WorkspaceSchedule');
const UserActivitySchema = require('./schemas/UserActivity');

module.exports = {
    Achievement: mongoose.model('achievement', AchievementsSchema),
    Interest: mongoose.model('interest', InterestSchema),
    Mentorship: mongoose.model('mentorship', MentorshipSchema),
    User: mongoose.model('user', UserSchema),
    UserActivity: mongoose.model('user_activities', UserActivitySchema),
    UserConnection: mongoose.model('user_connection', UserConnectionSchema),
    UserExperience: mongoose.model('user_experience', UserExperienceSchema),
    Workspace: mongoose.model('workspace', WorkspaceSchema),
    WorkspaceSchedule: mongoose.model('workspace_schedule', WorkspaceScheduleSchema),
}
