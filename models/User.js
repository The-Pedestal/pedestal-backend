const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	birth_date: Date,
	gender: String,
	occupation: String,
	email: String,
	username: String,
	phone: String,
	photo: String,
	getstream_token: String,
	cognito_sub: String,
	getstream_user_id: String,
	connections: [Object],
	interests: [String],
	tagline: String,
	bio: String,
	brand_statement: String,
	experiences: [Object],
	pronouns: String,
});

module.exports = mongoose.model(
	'User',
	UserSchema
);
