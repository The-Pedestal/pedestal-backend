const mongoose = require('mongoose');

const InterestSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Interest', InterestSchema);
