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
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});
