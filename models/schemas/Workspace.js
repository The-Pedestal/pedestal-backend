const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Timestamps = require('./commons/Timestamps');

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: [],
    }],
    notes: {
        type: Array,
        default: [],
    },
    schedules: [{
        type: Scheme.Types.ObjectId,
        ref: 'workspace_schedule'
    }],
    achievements: [{
        achievement: {
            type: Schema.Types.ObjectId,
            ref: 'achievement'
        },
        progress: {
            type: Number,
            default: 0
        },
        unlocked_at: {
            type: Date,
            default: null
        },
        ...Timestamps
    }],
    ...Timestamps,
});
