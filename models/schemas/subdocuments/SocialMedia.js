const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    facebook: String,
    twitter: String,
    linkedin: String,
    tiktok: String,
    medium: String,
    torum: String,
    pinterest: String,
    github: String,
    personal_site: String,
    custom: {
        name: String,
        url: String,
    },
});