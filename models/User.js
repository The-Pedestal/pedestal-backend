const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	occupation: String,
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
	brand_statement: String,
	experiences: [
		{
			type: Schema.Types.ObjectId,
			ref: experienceSchema,
		},
	],
	pronouns: String,
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: projectSchema,
		},
	],
	location: String,
	education: [
		{
			type: Schema.Types.ObjectId,
			ref: educationSchema,
		},
	],
	social_media: [
		{
			type: Schema.Types.ObjectId,
			ref: socialMediaSchema,
		},
	],
});

//project Schema
const projectSchema = new Schema({
	//who does the project belong to
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		default: '',
	},
	url: {
		type: String,
		default: '',
	},
	description: {
		type: String,
		default: '',
	},
	image: {
		type: String,
		default: '',
	},
});

//experiences schema
const experienceSchema = new Schema({
	title: {
		type: String,
		required: true,
		default: '',
	},
	company: {
		type: String,
		required: true,
		default: '',
	},
	location: {
		type: String,
		default: '',
	},
	description: {
		type: String,
		default: '',
	},
	start_date: {
		type: Date,
	},
	current_job: {
		type: Boolean,
	},
	end_date: {
		type: Date,
	},
	//who does the experience belong to
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

//education schema
const educationSchema = new Schema({
	school: {
		type: String,
		required: true,
		default: '',
	},
	degree: {
		type: String,
		default: '',
	},
	field_of_study: {
		type: String,
		default: '',
	},
	start_date: {
		type: Date,
	},
	end_date: {
		type: Date,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const socialMediaSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: { type: String, default: '' },
	url: { type: String, default: '' },
});

module.exports = mongoose.model(
	'User',
	UserSchema
);
