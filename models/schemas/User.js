const mongoose = require("mongoose");
const Timestamps = require("./commons/Timestamps");
const SocialMediaSchema = require("./subdocuments/SocialMedia");

const UserSchema = new mongoose.Schema({
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
            values: [null, "Male", "Female", "Other"],
        },
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
    skills: [String],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review",
        },
    ],
    workspaces: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "workspace",
        },
    ],
    interests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "interest",
        },
    ],
    experiences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user_experience",
        },
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user_project",
        },
    ],
    education: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user_education",
        },
    ],
    social_media: [SocialMediaSchema],
});

UserSchema.virtual("full_name").get(function () {
    return this.first_name + " " + this.last_name;
});

module.exports = UserSchema;
