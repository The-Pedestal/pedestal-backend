const ConnectionUtil = require('../utils/Connections.js');
const WorkspaceController = require('../controllers/WorkspaceController');
const UserController = require('../controllers/UserController');
const UserConnectionController = require('../controllers/UserConnectionController');
const UserExperienceController = require('../controllers/UserExperienceController');
const MentorshipController = require('../controllers/MentorshipController');

module.exports.init = async (app) => {

    ConnectionUtil.connect();

    app.get('/users', UserController.get);
    app.get('/users/:id', UserController.show);
    app.post('/users', UserController.create);
    app.put('/users/:id', UserController.update);
    app.delete('/users/:id', UserController.delete);

    app.get('/users/:id/suggest', UserController.suggestConnectionToUser);

    app.get('/users/:user/experiences', UserExperienceController.get);
    app.get('/users/:user/experiences/:id', UserExperienceController.show);
    app.post('/users/:user/experiences', UserExperienceController.create);
    app.put('/users/:user/experiences/:id', UserExperienceController.update);
    app.delete('/users/:user/experiences/:id', UserExperienceController.delete);

    app.get('/users/:user/connections', UserConnectionController.get);
    app.get('/users/:user/connections/:id', UserConnectionController.show);
    app.post('/users/:user/connections', UserConnectionController.create);
    app.put('/users/:user/connections/:id', UserConnectionController.update);
    app.delete('/users/:user/connections/:id', UserConnectionController.delete);

    app.get('/users/:user/workspaces', WorkspaceController.getUserWorkspace);
    app.get('/users/:user/workspaces/:id', WorkspaceController.showUserWorkspace);
    app.post('/users/:user/workspaces', WorkspaceController.createUserWorkspace);
    app.put('/users/:user/workspaces/:id', WorkspaceController.updateUserWorkspace);
    app.delete('/users/:user/workspaces/:id', WorkspaceController.deleteUserWorkspace);

    app.get('/users/:user/mentors', MentorshipController.getUserMentors);
    app.get('/users/:user/mentors/:mentor', MentorshipController.showUserMentors);

    app.get('/users/:user/mentees', MentorshipController.getUserMentees);
    app.get('/users/:user/mentees/:mentee', MentorshipController.showUserMentees);
}
