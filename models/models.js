const InterestSchema = require('./schemas/Interest.js');
const mongoose = require('mongoose');
const UserConnectionSchema = require('./schemas/UserConnection.js');
const UserExperienceSchema = require('./schemas/UserExperience.js');
const UserSchema = require('./schemas/User.js');

module.exports = {
    User: mongoose.model('user', UserSchema),
    UserExperience: mongoose.model('user_experience', UserExperienceSchema),
    UserConnection: mongoose.model('user_connection', UserConnectionSchema),
    Interest: mongoose.model('interest', InterestSchema),
}