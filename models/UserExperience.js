const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserExperienceSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
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
		type: String,
		ref: 'User',
	},
});

module.exports = mongoose.model(
	'UserExperience',
	UserExperienceSchema
);
