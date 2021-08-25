const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
    cognito_sub: String,
    connected_cognito_sub: String,
    status: String
});

module.exports = mongoose.model('Connection', ConnectionSchema);
