const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    set_name: {
        type: String,
        required: true
    },
    question: {
        type: String,
        require: true,
    },
    sequence_no: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: "multiple_choice",
        enum: {
            values: ["multiple_choice", "essay"],
        },
    },
    choices: {
        type: [String],
        default: null,
    },
    answer: {
        type: String,
        default: null,
    },
});
