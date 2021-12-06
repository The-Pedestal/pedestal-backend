const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// user education schema
module.exports = new Schema({
    school: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        default: "",
    },
    field_of_study: {
        type: String,
        default: "",
    },
    start_month: {
        type: Number,
        required: true,
    },
    start_year: {
        type: Number,
        required: true,
    },
    end_year: {
        type: Number,
        required: true,
    },
    end_month: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});
