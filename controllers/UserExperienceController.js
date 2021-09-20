const Models = require('../models');

module.exports.get = async (req, res) => {
    /**
     * @TODO support filtering by adding query string as keywords
     */
    res.send({
        success: true,
        data: await Models.UserExperience.find({
            user: req.params.user,
        }),
    });
};

module.exports.show = async (req, res) => {
    const result = {};
    try {
        const experience =
            await Models.UserExperience.find({
                user: req.params.user,
                _id: req.params.id,
            });
        res.status(200);
        result.success = true;
        result.data = experience;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }
    res.send(result);
};

module.exports.create = async (req, res) => {
    const result = {};
    let error_message = null;

    req.body.user = req.params.user;

    Models.UserExperience.create(
        req.body,
        async (error, experience) => {
            if (!error) {
                try {
                    await Models.User.findByIdAndUpdate(
                        experience.user, {
                            $addToSet: {
                                experiences: experience._id,
                            },
                        }
                    );

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
        }
    );
};

module.exports.update = async (req, res) => {
    const result = {};
    try {
        const experience =
            await Models.UserExperience.findOneAndUpdate({
                    user: req.params.user,
                    _id: req.params.id,
                },
                req.body, {
                    returnOriginal: false,
                }
            );

        res.status(200);
        result.success = true;
        result.data = experience;
    } catch (error) {
        res.status(500);
        result.error = error.message;
        result.success = false;
    }

    res.send(result);
};

module.exports.delete = async (req, res) => {
    const result = {};
    try {
        const user =
            await Models.User.findByIdAndUpdate(
                req.params.user, {
                    $pull: {
                        experiences: req.params.id,
                    },
                }
            );
        const delete_result =
            await Models.UserExperience.deleteOne({
                _id: req.params.id,
            });

        res.status(200);
        result.success = true;
        result.data = {
            count: delete_result.deletedCount,
        };
    } catch (error) {
        res.status(500);
        result.error = error.message;
        result.success = false;
    }

    res.send(result);
};
