const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: null,
    },
    employment_type: {
        type: String,
        required: true,
        enum: {
            values: [
                "Full-time",
                "Part-time",
                "Self-employed",
                "Freelance",
                "Contract",
                "Internship",
                "Apprenticeship",
                "Volunteer",
            ]
        }
    },
    description: {
        type: String,
        default: null,
    },
    start_date: {
        type: Date,
        required: true,
    },
    current_job: {
        type: Boolean,
        default: false,
    },
    end_date: {
        type: Date,
        default: null,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});
