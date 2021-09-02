const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
    description: String,
    total_pbt: Number,
    icon: String,
});
