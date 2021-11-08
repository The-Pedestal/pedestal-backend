const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Timestamps = require("./commons/Timestamps");

module.exports = new Schema({
    title: {
        type: String,
        required: true,
    },
    mentor: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    mentees: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
            default: [],
        },
    ],
    notes: {
        type: Array,
        default: [],
    },
    schedules: [
        {
            type: Schema.Types.ObjectId,
            ref: "workspace_schedule",
        },
    ],
    achievements: [
        {
            achievement: {
                type: Schema.Types.ObjectId,
                ref: "achievement",
            },
            progress: {
                type: Number,
                default: 0,
            },
            unlocked_at: {
                type: Date,
                default: null,
            },
            ...Timestamps,
        },
    ],
    max_storage_in_gb: {
        type: Number,
        default: 10
    },
    storage_used_in_gb: {
        type: Number,
        default: 0,
    },
    ...Timestamps,
});
