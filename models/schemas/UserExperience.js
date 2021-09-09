const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Timestamps = require('./commons/Timestamps');

module.exports = new Schema({
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
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	...Timestamps,
});
