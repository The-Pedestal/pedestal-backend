const {
    connect
} = require('../utils/Connections.js');
const Models = require('../models/models.js')
const stream = require('getstream');

/**
 *
 * @param  express an express instance
 */
module.exports.init = async (express) => {

    /**
     * Connects the application to the mongodb database;
     */
    await connect();

    express.get('/achievements', async (req, res) => {
        const result = {};
        const achievements = await Models.Achievement.find({});

        res.status(200);

        result.success = true;
        result.data = achievements;

        res.send(result);
    });

    express.get('/achievements/:id', async (req, res) => {
        const result = {};
        const achievement = await Models.Achievement.findById(req.params.id);

        res.status(200);

        result.success = true;
        result.data = achievement;

        res.send(result);
    });

    express.post('/achievements', async (req, res) => {
        const result = {};
        const achievement = await Models.Achievement.create(req.body);

        res.status(200);

        result.success = true;
        result.data = achievement;

        res.send(result);
    });

    express.put('/achievements/:id', async (req, res) => {
        const result = {};
        const achievement = await Models.Achievement.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            returnOriginal: false
        });

        res.status(200);

        result.success = true;
        result.data = achievement;

        res.send(result);
    });

    express.delete('/achievements/:id', async (req, res) => {
        res.send({});
    });
}
