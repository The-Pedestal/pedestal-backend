const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    token_type: {
        type: String,
        default: null,
    },
    expires_in: {
        type: String,
        default: null,
    },
    created_at: {
        type: String,
        default: null,
    },
    refresh_token: {
        type: String,
        default: null,
    },
    access_token: {
        type: String,
        default: null,
    },
    scope: {
        type: String,
        default: null,
    },
    owner: {
        type: String,
        default: null,
    },
    organization: {
        type: String,
        default: null,
    }
});
