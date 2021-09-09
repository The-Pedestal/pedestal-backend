const ConnectionUtil = require('../utils/Connections.js');
const AchievementController = require('../controllers/AchievementController');

module.exports.init = async (app) => {
	ConnectionUtil.connect();

	app.get(
		'/achievements',
		AchievementController.get
	);
	app.get(
		'/achievements/:id',
		AchievementController.show
	);
	app.post(
		'/achievements',
		AchievementController.create
	);
	app.put(
		'/achievements/:id',
		AchievementController.update
	);
	app.delete(
		'/achievements/:id',
		AchievementController.delete
	);
};
