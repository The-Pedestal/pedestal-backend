const Models = require('../models');

//get all the user Projects
module.exports.get = async (req, res) => {
	res.send({
		success: true,
		data: await Models.UserProject.find({
			user: req.params.user,
		}),
	});
};

//get a single project
module.exports.show = async (req, res) => {
	const result = {};
	try {
		const project = await Models.UserProject.find(
			{
				user: req.params.user,
				_id: req.params.id,
			}
		);
		res.status(200);
		result.success = true;
		result.data = project;
	} catch (error) {
		res.status(500);
		result.success = false;
		result.error = error.message;
	}
	res.send(result);
};

//create a project
module.exports.create = async (req, res) => {
	const result = {};
	let error_message = null;

	req.body.user = req.params.user;

	Models.UserProject.create(
		req.body,
		async (error, project) => {
			if (!error) {
				try {
					const user =
						await Models.User.findByIdAndUpdate(
							project.user,
							{
								$addToSet: {
									projects: project._id,
								},
							}
						);
					res.status(200);
					result.success = true;
					result.data = project;
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

//update a project
module.exports.update = async (req, res) => {
	const result = {};
	try {
		const project =
			await Models.UserProject.findOneAndUpdate(
				{
					user: req.params.user,
					_id: req.params.id,
				},
				req.body,
				{ returnOriginal: false }
			);
		res.status(200);
		result.success = true;
		result.data = project;
	} catch (error) {
		res.status(500);
		result.error = error.message;
		result.success = false;
	}
	res.send(result);
};

module.exports.delete = async (req, res) => {
	const result = {};
	try {
		const user =
			await Models.User.findByIdAndUpdate(
				req.params.user,
				{
					$pull: {
						projects: req.params.id,
					},
				}
			);
		const delete_result =
			await Models.UserProject.deleteOne({
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
