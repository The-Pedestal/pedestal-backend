const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: String,
        default: null, //should always be in MM/DD/YYYY format
    },
    gender: {
        type: String,
        default: null,
        enum: {
            values: [null, 'Male', 'Female', 'Other'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true, //should always be in E.164 format
    },
    photo: {
        type: String,
        default: null,
    },
    cognito_sub: {
        type: String,
        default: null,
    },
    getstream_token: {
        type: String,
        default: null,
    },
    tagline: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: null,
    },
    pronouns: {
        type: String,
        default: null,
    },
    location: {
        type: String,
        default: null,
    },
    brand_statement: {
        type: String,
        default: null,
    },
    connections: [{
        type: Schema.Types.ObjectId,
        ref: 'user_connection'
    }],
    interests: [{
        type: Schema.Types.ObjectId,
        ref: 'interest'
    }],
    experiences: [{
        type: Schema.Types.ObjectId,
        ref: 'user_experience',
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'UserProject',
    }],
    education: [{
        type: Schema.Types.ObjectId,
        ref: 'UserEducation',
    }],
    social_media: [{
        type: Schema.Types.ObjectId,
        ref: 'UserSocialMedia',
    }],

    /**
     * @TODO add timezones
     */
});