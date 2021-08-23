const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    user_id: mongoose.Types.ObjectId,
    status: String
});

module.exports = mongoose.model('Connection', ConnectionSchema);
