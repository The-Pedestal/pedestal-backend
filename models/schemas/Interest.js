const mongoose = require('mongoose');
const Timestamps = require('./commons/Timestamps');

module.exports = new mongoose.Schema({
    name: String,
    ...Timestamps,
});
