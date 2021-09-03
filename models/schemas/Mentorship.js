const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Timestamps = require('./commons/Timestamps');

module.exports = new mongoose.Schema({
    mentor: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    mentee: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    mentee_request_status: {
        type: String,
        default: 'pending',
        values: ['pending', 'accepted', 'declined', 'completed'],
    },
    ...Timestamps,
});
