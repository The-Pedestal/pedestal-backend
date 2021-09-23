const mongoose = require("mongoose");
const Timestamps = require("./commons/Timestamps");
const Schema = mongoose.Schema;

module.exports = new Schema({
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workspace",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    start_at: {
        type: Date,
        default: null,
    },
    end_at: {
        type: Date,
        default: null,
    },
    ...Timestamps,
});
