

module.exports.USER_CONNECTION_PENDING = 'pending';
module.exports.USER_CONNECTION_ACCEPTED = 'accepted';
module.exports.USER_CONNECTION_DECLINED = 'declined';

module.exports.MENTOR_AGREEMENT_PENDING = 'pending';
module.exports.MENTOR_AGREEMENT_ACCEPTED = 'accepted';
module.exports.MENTOR_AGREEMENT_DECLINED = 'declined';

module.exports.MENTEE_AGREEMENT_PENDING = 'pending';
module.exports.MENTEE_AGREEMENT_ACCEPTED = 'accepted';
module.exports.MENTEE_AGREEMENT_DECLINED = 'declined';

module.exports.MENTORSHIP_PENDING = 'pending';
module.exports.MENTORSHIP_ACCEPTED = 'accepted';
module.exports.MENTORSHIP_COMPLETED = 'completed';
module.exports.MENTORSHIP_DECLINED = 'declined';

module.exports.MENTOR = 'mentor';
module.exports.MENTEE = 'mentee';

module.exports.REACTION_LIKE = 'like';
module.exports.REACTION_COMMENT = 'comment';

module.exports.DEFAULT_ENGAGEMENT_QUESTIONS = [
    {
        set_name: "Availability",
        question: "When do you want to start being mentored?",
        type: "multiple_choice",
        choices: [
            "As soon as possible",
            "This week",
            "This month",
            "Next month",
            "I'm not sure yet"
        ],
        sequence_no: 1,
    },
    {
        set_name: "Availability",
        question: "How long are you looking to get mentored?",
        type: "multiple_choice",
        choices: [
            "A few days",
            "A week",
            "A few weeks",
            "A month",
            "A few months"
        ],
        sequence_no: 2,
    },
    {
        set_name: "Expectations",
        question: "What are you hoping to get from me?",
        type: "essay",
        sequence_no: 1,
    },
    {
        set_name: "Expectations",
        question: "What do you expect from me?",
        type: "essay",
        sequence_no: 2,
    },
    {
        set_name: "Expectations",
        question: "What do you see this engagement looking like?",
        type: "essay",
        sequence_no: 3,
    },
    {
        set_name: "Goals",
        question: "What describes your current situation?",
        type: "multiple_choice",
        choices: [
            "I’m a student",
            "I’m a new graduate",
            "I want to change my current job or career",
            "I want to improve my skills",
            "I need help for my project",
            "I need help for my business",
            "Other",
        ],
        sequence_no: 1,
    },
    {
        set_name: "Goals",
        question: "Are you a DEI (Diversity, Equity, and Inclusion) member?",
        type: "multiple_choice",
        choices: [
            "Yes",
            "No",
        ],
        sequence_no: 2,
    },
    {
        set_name: "Goals",
        question: "Are you a veteran?",
        type: "multiple_choice",
        choices: [
            "Yes",
            "No",
        ],
        sequence_no: 3,
    },
];
