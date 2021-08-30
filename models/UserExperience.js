const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//experiences schema
const ExperienceSchema = new Schema({
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

module.exports = mongoose.model(
	'UserExperience',
	ExperienceSchema
);
