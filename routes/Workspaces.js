const ConnectionUtil = require('../utils/Connections.js');
const WorkspaceController = require('../controllers/WorkspaceController');
const WorkspaceScheduleController = require('../controllers/WorkspaceScheduleController');
const WorkspaceAchievementController = require('../controllers/WorkspaceAchievementController');

module.exports.init = async (app) => {

    ConnectionUtil.connect();

    app.get('/workspaces', WorkspaceController.get);
    app.get('/workspaces/:id', WorkspaceController.show);

    /**
     * @see /routes/Users.js for creating a workspace
     * */

    app.put('/workspaces/:id', WorkspaceController.update);
    app.delete('/workspaces/:id', WorkspaceController.delete);

    app.get('/workspaces/:workspace/achievements', WorkspaceAchievementController.get);
    app.get('/workspaces/:workspace/achievements/:id', WorkspaceAchievementController.show);
    app.post('/workspaces/:workspace/achievements', WorkspaceAchievementController.create);
    app.put('/workspaces/:workspace/achievements/:id', WorkspaceAchievementController.update);
    app.delete('/workspaces/:workspace/achievements/:id', WorkspaceAchievementController.delete);

    app.get('/workspaces/:workspace/schedules', WorkspaceScheduleController.get);
    app.get('/workspaces/:workspace/schedules/:id', WorkspaceScheduleController.show);
    app.post('/workspaces/:workspace/schedules', WorkspaceScheduleController.create);
    app.put('/workspaces/:workspace/schedules/:id', WorkspaceScheduleController.update);
    app.delete('/workspaces/:workspace/schedules/:id', WorkspaceScheduleController.delete);


}
