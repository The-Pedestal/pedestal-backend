const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    user_id: String,
    connected_user: String,
    status: String
});

module.exports = mongoose.model('Connection', ConnectionSchema);
