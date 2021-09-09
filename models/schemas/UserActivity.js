const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Timestamps = require('./commons/Timestamps');

module.exports = new Schema({
    activity_id: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    media: {
        type: String,
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
        ref: 'user'
    },
    ...Timestamps,
});
