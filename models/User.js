const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserEducation = mongoose.model(
// 	'UserEducation',
// 	educationSchema
// );
// const UserEducation = mongoose.model(
// 	'UserExperience',
// 	experienceSchema
// );
// const UserEducation = mongoose.model(
// 	'UserProjects',
// 	projectsSchema
// );
// const UserSocialMedia = mongoose.model(
// 	'UserSocialMedia',
// 	socialMediaSchema
// );

const UserSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	birth_date: Date,
	gender: String,
	current_occupation: String,
	current_company: String,
	email: {
		type: String,
	},
	username: String,
	phone: String,
	mentor: Boolean,
	photo: String,
	getstream_token: String,
	cognito_sub: String,
	getstream_user_id: String,
	connections: [Object],
	interests: [String],
	tagline: String,
	bio: String,
	pronouns: String,
	location: String,
	brand_statement: String,
	experiences: [
		{
			type: Schema.Types.ObjectId,
			ref: 'UserExperience',
		},
	],
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: 'UserProject',
		},
	],

	education: [
		{
			type: Schema.Types.ObjectId,
			ref: 'UserEducation',
		},
	],
	social_media: [
		{
			type: Schema.Types.ObjectId,
			ref: 'UserSocialMedia',
		},
	],
});

module.exports = mongoose.model(
	'User',
	UserSchema
);
