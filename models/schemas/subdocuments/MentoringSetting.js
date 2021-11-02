const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    monthly_rate: {
        type: String,
        default: null,
    },
    dei_discount: {
        type: String,
        default: null,
    },
    veteran_discount: {
        type: String,
        default: null,
    },
});
