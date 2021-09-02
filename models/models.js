const InterestSchema = require('./schemas/Interest.js');
const mongoose = require('mongoose');
const UserConnectionSchema = require('./schemas/UserConnection.js');
const UserExperienceSchema = require('./schemas/UserExperience.js');
const UserSchema = require('./schemas/User.js');
const UserWorkspaceSchema = require('./schemas/UserWorkspace.js');

module.exports = {
    Interest: mongoose.model('interest', InterestSchema),
    User: mongoose.model('user', UserSchema),
    UserConnection: mongoose.model('user_connection', UserConnectionSchema),
    UserExperience: mongoose.model('user_experience', UserExperienceSchema),
    UserWorkspace: mongoose.model('user_workspace', UserWorkspaceSchema),
}
