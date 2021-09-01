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

    express.get('/interests', async (req, res) => {
        const result = {};
        try {
            const interests = await Models.Interest.find({});
            res.status(200);
            result.success = true;
            result.data = interests;
        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }
        res.send(result);
    });

    express.get('/interests/:id', async (req, res) => {
        const result = {};
        try {
            const interest = await Models.Interest.findById(req.params.id);
            res.status(200);
            result.success = true;
            result.data = interest;
        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }
        res.send(result);
    });

    express.post('/interests', async (req, res) => {
        const result = {};
        Models.Interest.create(req.body, (err, interest) => {
            try {
                if (err) {
                    throw err.message;
                }
                res.status(200);
                result.success = true;
                result.data = interest;
            } catch (error) {
                res.status(500);
                result.success = false;
                result.error = error.message;
            }
            res.send(result);
        });
    });

    express.put('/interests/:id', async (req, res) => {
        const result = {};
        try {
            const interest = await Models.Interest.findByIdAndUpdate(req.params.id, req.body, {
                returnOriginal: false
            });

            res.status(200);

            result.success = true;
            result.data = interest
        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }

        res.send(result);
    });

    express.delete('/interests/:id', async (req, res) => {
        res.send({});
    });
}
