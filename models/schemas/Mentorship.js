const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Timestamps = require("./commons/Timestamps");

module.exports = new mongoose.Schema(
    {
        applicant: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        mentor: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        mentee: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        status: {
            type: String,
            default: "pending",
            values: ["pending", "accepted", "declined", "completed"],
        },
        mentee_agreement_status: {
            type: String,
            default: "pending",
            values: ["pending", "accepted", "declined"],
        },
        mentor_agreement_status: {
            type: String,
            default: "pending",
            values: ["pending", "accepted", "declined"],
        },
        application_questions: [String],
    },
    { timestamps: true },
);
