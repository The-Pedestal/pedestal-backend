const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Timestamps = require("./commons/Timestamps");

const socialMediaSchema = new Schema({
  facebook: "String",
  twitter: "String",
  linkedin: "String",
  tiktok: "String",
  medium: "String",
  torum: "String",
  pinterest: "String",
  github: "String",
  personal_site: "String",
  custom: {
    name: "String",
    url: "String",
  },
});

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
  mentor_status: Boolean,
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
  workspaces: [
    {
      type: Schema.Types.ObjectId,
      ref: "workspace",
    },
  ],
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: "user_connection",
    },
  ],
  interests: [
    {
      type: Schema.Types.ObjectId,
      ref: "interest",
    },
  ],
  experiences: [
    {
      type: Schema.Types.ObjectId,
      ref: "user_experience",
    },
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "user_project",
    },
  ],
  education: [
    {
      type: Schema.Types.ObjectId,
      ref: "user_education",
    },
  ],
  social_media: [socialMediaSchema],
  ...Timestamps,
});
