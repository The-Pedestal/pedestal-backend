const User = require('../models/User.js');
const UserExperience = require('../models/UserExperience.js');
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
    await connect();

    /**
     * Retrieves a list of users
     *
     * GET /users
     */
    express.get('/users', async (req, res) => {
        /**
         * @TODO support filtering by adding query string as keywords
         */
        res.send({
            success: true,
            data: await User.find({})
        });
    });

    /**
     * Retrieves a single user
     *
     * GET /users/{_id}
     */
    express.get('/users/:id', async (req, res) => {
        const {
            id
        } = req.params;
        const result = {}

        try {
            const user = await User.findById(id);
            /**
             * @TODO find a way to optimize this by using a single query.
             */
            const user_experiences = await UserExperience.find({
                user: id
            });

            user.experiences = user_experiences;

            res.status(200);

            result.success = true;
            result.data = user;

        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }
        res.send(result);
    });

    /**
     * Creates a user
     *
     * POST /users
     */
    express.post('/users', async (req, res) => {
        const result = {};
        let error_message = false;

        await User.create(req.body, async (error, user) => {
            try {
                if (!error) {

                    const client = stream.connect(STREAM_KEY, STREAM_SECRET);
                    const user_id = user._id.toString();

                    await client.user(user_id).create(user);

                    const stream_token = client.createUserToken(user_id);
                    const new_user = await User.findByIdAndUpdate(user_id, {
                        getstream_token: stream_token
                    }, {
                        returnOriginal: false
                    });

                    await client.user(user_id).update(new_user);

                    res.status(200);

                    result.success = true;
                    result.data = user;

                } else {
                    error_message = error.message;
                }

            } catch (error) {
                error_message = error.message;
            }

            if (error_message) {
                res.status(500);
                result.success = false;
                result.error = error.message;
            }

            res.send(result);
        });
    });

    /**
     * Updates a user
     *
     * PUT /users/{_id}
     */
    express.put('/users/:id', async (req, res) => {
        const result = {};
        const {
            id
        } = req.params;

        try {
            const client = stream.connect(STREAM_KEY, STREAM_SECRET);
            const user = await User.findByIdAndUpdate(id, req.body, {
                returnOriginal: false
            });

            await client.user(id).update(user);

            res.status(200);

            result.success = true;
            result.data = user;

        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }

        res.send(result);
    });

    /**
     * Delete a user
     *
     * DELETE /users/:id/connections
     */
    express.delete('/users/:id', async (req, res) => {
        res.send({
            message: 'not yet supported'
        });
    });


    /**
     * Retrieves all the connections that belongs to a user
     *
     * GET /users/:id/connections
     */
    express.get('/users/:id/connections', async (req, res) => {


    });

    /**
     * Retrieves all the mentors that belongs to a user
     *
     * GET /users/:id/mentors
     */
    express.get('/users/:id/mentors', async (req, res) => {

    });

    /**
     * Retrieves all the mentees that belongs to a user
     *
     * GET /users/:id/mentors
     */
    express.get('/users/:id/mentees', async (req, res) => {

    });

    /**
     * Retrieves all the workspaces that the user belongs
     *
     * GET /users/:id/mentors
     */
    express.get('/users/:id/workspaces', async (req, res) => {

    });

    /**
     *
     */
    express.get('/users/:id/experiences', async (req, res) => {
        const {
            id
        } = req.params;
        const result = {};

        try {
            const user_experiences = await UserExperience.find({
                user: id
            });

            res.status(200);

            result.success = true;
            result.data = user_experiences;
            result.params = id
        } catch (error) {
            res.status(500);
            result.success = false;
            result.error = error.message;
        }

        res.send(result);
    });


    /**
     *
     */
    express.get('/users/:id/projects', async (req, res) => {

    });
}
