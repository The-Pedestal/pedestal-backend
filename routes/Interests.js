const ConnectionUtil = require('../utils/Connections.js');
const InterestController = require('../controllers/InterestController');

module.exports.init = async (app) => {

    ConnectionUtil.connect();

    app.get('/interests', InterestController.get);
    app.get('/interests/:id', InterestController.show);
    app.post('/interests', InterestController.create);
    app.put('/interests/:id', InterestController.update);
    app.delete('/interests/:id', InterestController.delete);
}
