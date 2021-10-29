const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    mentorship: {
        type: Schema.Types.ObjectId,
        ref: "mentorship",
        required: true,
    },
    session_id: {
        type: String,
        default: null,

    },
    session_data: {
        type: String,
        default: null,
    },
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    return_url: {
        type: String,
        required: true
    },
    expires_at: {
        type: String,
        default: null,
    },
    notifications: [Object],
});

module.exports = TransactionSchema;
