const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EngagementQuestions = require("./subdocuments/EngagementQuestions");

module.exports = new mongoose.Schema({
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
    mentor_agreement_status: {
        type: String,
        value: ["pending", "accepted", "declined"]
    },
    mentee_agreement_status: {
        type: String,
        value: ["pending", "accepted", "declined"]
    },
    status: {
        type: String,
        default: "pending",
        values: ["pending", "cancelled", "accepted", "declined", "completed"],
    },
    questions: [EngagementQuestions],
}, { timestamps: true });
