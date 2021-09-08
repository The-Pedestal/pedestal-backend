const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
	//who does the project belong to
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
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
});
