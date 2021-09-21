const ConnectionUtil = require('../utils/Connections.js');
const ActivityController = require('../controllers/ActivityController');

module.exports.init = async (app) => {

    ConnectionUtil.connect();

    app.get('/activities', ActivityController.get);
    app.get('/activities/:id', ActivityController.show);
    app.post('/activities/:activity_id/reactions', ActivityController.createReaction)
    app.put('/activities/:activity_id/reactions/:id', ActivityController.updateReaction);
    app.delete('/activities/:activity_id/reactions/:id', ActivityController.deleteReaction);
}
