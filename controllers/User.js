const stream = require('getstream');
const Models = require('../models/models.js')
const {
    connect
} = require('../utils/Connections.js');

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
            data: await Models.User.find({})
        });
    });

    /**
     * Retrieves a single user
     *
     * GET /users/{_id}
     */
    express.get('/users/:id', async (req, res) => {
        const result = {}
        try {
            /**
             * @TODO find a way to optimize this by using a single query.
             */
            const user = await Models.User.findOne({
                    _id: req.params.id
                })
                .populate('interests')
                .populate('experiences')
                .exec();

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

        await Models.User.create(req.body, async (error, user) => {
            try {
                if (!error) {

                    const client = stream.connect(STREAM_KEY, STREAM_SECRET);
                    const user_id = user._id.toString();

                    await client.user(user_id).create(user);

                    const stream_token = client.createUserToken(user_id);
                    const new_user = await Models.User.findByIdAndUpdate(user_id, {
                        getstream_token: stream_token
                    }, {
                        returnOriginal: false
                    });

                    await client.user(user_id).update(new_user);

                    res.status(200);

                    result.success = true;
                    result.data = await Models.User
                        .findById(user_id)
                        .populate('interests')
                        .populate('experiences');

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
        try {
            const client = stream.connect(STREAM_KEY, STREAM_SECRET);
            const user = await Models.User.findByIdAndUpdate(req.params.id, req.body, {
                returnOriginal: false
            });

            await client.user(req.params.id).update(user);

            res.status(200);
            result.success = true;
            result.data = result.data = await Models.User
                .findById(req.params.id)
                .populate('interests')
                .populate('experiences');

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
        const result = {};
        try {
            const user_experiences = await Models.UserExperience.find({
                user: req.params.id
            });

            res.status(200);

            result.success = true;
            result.data = user_experiences;
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
