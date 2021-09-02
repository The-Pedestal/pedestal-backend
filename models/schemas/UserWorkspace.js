const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    mentor: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    mentees: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: [],
    }],
    notes: {
        type: Array,
        default: [],
    },
    achievements: [{
        achievement: {
            type: Schema.Types.ObjectId,
            ref: 'achievement'
        },
        progress: Number,
        unlocked_at: Date
    }],
});
