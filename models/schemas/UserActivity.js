const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Timestamps = require("./commons/Timestamps");

module.exports = new Schema({
    reference_id: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        required: true,
    },
    media: {
        type: Object,
        default: null,
    },
    verb: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        default: null,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });
