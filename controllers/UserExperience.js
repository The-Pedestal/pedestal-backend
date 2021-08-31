const UserExperience = require('../models/UserExperience.js');
const User = require('../models/User.js');
const {
    connect
} = require('../utils/Connections.js');
const stream = require('getstream');

const STREAM_KEY = process.env.GETSTREAM_KEY;
const STREAM_SECRET = process.env.GETSTREAM_SECRET;

/**
 *
 * @param  express an express instance
 */
module.exports.init = async (express) => {

    /**
     * Connects the application to the mongodb database;
     */
    await connect();;

    /**
     * Retrieves a list of experiences
     *
     * GET /users
     */
    express.get('/experiences', async (req, res) => {
        /**
         * @TODO support filtering by adding query string as keywords
         */
        res.send({
            success: true,
            data: await UserExperience.find({})
        });
    });

    /**
     * Retrieves a single of experiences
     *
     * GET /users
     */
    express.get('/experiences/:id', async (req, res) => {
        const result = {};
        const {
            id
        } = req.params;
        try {
            const experience = await UserExperience.findById(id);
            res.status(200);
            result.success = true;
            result.data = experience;
        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }
        res.send(result);
    });


    /**
     * Update
     *
     * GET /users
     */
    express.put('/experiences/:id', async (req, res) => {
        const result = {};
        const {
            id
        } = req.params;

        try {

            const experience = await UserExperience.findByIdAndUpdate(id, req.body, {
                returnOriginal: false
            });

            res.status(200);
            result.success = true;
            result.data = experience;

        } catch (error) {
            res.status(500);
            result.error = error.message;
            result.success = false;
        }

        res.send(result);
    });

    /*
     * Retrieves a list of experiences
     *
     * GET /users
     */
    express.post('/experiences', async (req, res) => {
        const result = {};
        let error_message = null;

        await UserExperience.create(req.body, async (error, experience) => {
            if (!error) {
                try {

                    const user = await User.findByIdAndUpdate(experience.user, {
                        $addToSet: {
                            experiences: experience._id
                        }
                    });

                    res.status(200);
                    result.success = true;
                    result.data = experience;

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
        });
    });

    express.delete('/experiences/:id', async (req, res) => {
        const {
            id
        } = req.params;
        const result = {};
        try {

            const experience = await UserExperience.findById(id);

            const user = await User.findByIdAndUpdate(experience.user, {
                $pull: {
                    experiences: experience._id
                }
            });

            const delete_result = await UserExperience.deleteOne({
                _id: id
            });


            res.status(200);
            result.success = true;
            result.data = {
                count: delete_result.deletedCount
            };
        } catch (error) {
            res.status(500);
            result.error = error.message;
            result.success = false;
        }

        res.send(result);
    });
};