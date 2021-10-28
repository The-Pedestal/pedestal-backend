const mongoose = require("mongoose");
const Timestamps = require("./commons/Timestamps");

module.exports = new mongoose.Schema({
    title: String,
    description: String,
    total_pbt: Number,
    icon: String,
    ...Timestamps,
});
