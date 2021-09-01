const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//education schema
const EducationSchema = new Schema({
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

module.exports = mongoose.model(
	'UserEducation',
	EducationSchema
);
