const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
	name: { type: String, default: '' },
	url: { type: String, default: '' },
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
});
