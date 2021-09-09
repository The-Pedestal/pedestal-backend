const Models = require('../models');

//get list of socials
module.exports.get = async (req, res) => {
	res.send({
		success: true,
		data: await Models.UserSocialMedia.find({
			user: req.params.user,
		}),
	});
};

//get a single social
module.exports.show = async (req, res) => {
	const result = {};
	try {
		const social =
			await Models.UserSocialMedia.find({
				user: req.params.user,
				_id: req.params.id,
			});
		res.status(200);
		result.success = true;
		result.data = social;
	} catch (error) {
		res.status(500);
		result.success = false;
		result.error = error.message;
	}
	res.send(result);
};

//create a social media
module.exports.create = async (req, res) => {
	const result = {};
	let error_message = null;

	req.body.user = req.params.user;

	Models.UserSocialMedia.create(
		req.body,
		async (error, social) => {
			if (!error) {
				try {
					await Models.User.findByIdAndUpdate(
						social.user,
						{
							$addToSet: {
								social_media: social._id,
							},
						}
					);

					res.status(200);
					result.success = true;
					result.data = social;
				} catch (error) {
					error_message = error.message;
				}
			} else {
				error_message = error.message;
			}

			if (error_message) {
				res.status(500);
				result.error = error_message;
				result.success = false;
			}

			res.send(result);
		}
	);
};

//update a social
module.exports.update = async (req, res) => {
	const result = {};
	try {
		const social =
			await Models.UserSocialMedia.findOneAndUpdate(
				{
					user: req.params.user,
					_id: req.params.id,
				},
				req.body,
				{
					returnOriginal: false,
				}
			);

		res.status(200);
		result.success = true;
		result.data = social;
	} catch (error) {
		res.status(500);
		result.error = error.message;
		result.success = false;
	}

	res.send(result);
};

//delete a single social media
module.exports.delete = async (req, res) => {
	const result = {};
	try {
		const user =
			await Models.User.findByIdAndUpdate(
				req.params.user,
				{
					$pull: {
						social_media: req.params.id,
					},
				}
			);
		const delete_result =
			await Models.UserSocialMedia.deleteOne({
				_id: req.params.id,
			});

		res.status(200);
		result.success = true;
		result.data = {
			count: delete_result.deletedCount,
		};
	} catch (error) {
		res.status(500);
		result.error = error.message;
		result.success = false;
	}

	res.send(result);
};
