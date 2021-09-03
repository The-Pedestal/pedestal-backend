const InterestSchema = require('./schemas/Interest.js');
const mongoose = require('mongoose');
const UserConnectionSchema = require('./schemas/UserConnection.js');
const UserExperienceSchema = require('./schemas/UserExperience.js');
const UserSchema = require('./schemas/User.js');
const WorkspaceSchema = require('./schemas/Workspace.js');
const AchievementsSchema = require('./schemas/Achievements.js');
const MentorshipSchema = require('./schemas/Mentorship.js');
const WorkspaceScheduleSchema = require('./schemas/WorkspaceSchedule');

module.exports = {
    Achievement: mongoose.model('achievement', AchievementsSchema),
    Interest: mongoose.model('interest', InterestSchema),
    User: mongoose.model('user', UserSchema),
    UserConnection: mongoose.model('user_connection', UserConnectionSchema),
    UserExperience: mongoose.model('user_experience', UserExperienceSchema),
    Workspace: mongoose.model('workspace', WorkspaceSchema),
    Mentorship: mongoose.model('mentorship', MentorshipSchema),
    WorkspaceSchedule: mongoose.model('workspace', WorkspaceScheduleSchema),
}
