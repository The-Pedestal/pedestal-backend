const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EngagementQuestions = require("./subdocuments/EngagementQuestions");
const AppConstants = require("../../constants/App");

module.exports = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    name: {
        type: String,
        required: true
    },
    country_of_residence: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true,
        value: ["Blockchain", "Design", "Digital Marketing", "Education", "Entrepreneurship", "Fashion", "Finance", "Health & Wellness", "Information Technology", "Legal", "Product Management", "Sales", "Software Engineering"]
    },
    current_role: {
        type: String,
        required: true,
    },
    expertise: {
        type: String,
        required: true,
        value: ["Senior", "Manager", "Director", "Lead", "Executive", "Founder"]
    },
    linkedin_profile_link: {
        type: String,
        required: true
    },
    hours_per_month: {
        type: Number,
        required: true
    },
    monthly_rate: {
        type: Number,
        required: true
    },
    preferred_contact_details: {
        type: String,
        required: true,
        value: ["email", "phone", "message"]
    },
    dei_discount: {
        type: Number,
        default: 0
    },
    veteran_discount: {
        type: Number,
        default: 0,
    },
    calendly_authorization_object: {
        type: String,
    },
    applicant_questionnaire: {
        type: [EngagementQuestions],
        default: AppConstants.DEFAULT_ENGAGEMENT_QUESTIONS
    }
}, { timestamps: true });
