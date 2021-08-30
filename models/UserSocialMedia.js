const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialMediaSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: { type: String, default: '' },
	url: { type: String, default: '' },
});

module.exports = mongoose.model(
	'UserSocialMedia',
	SocialMediaSchema
);
