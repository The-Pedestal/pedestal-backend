const Models = require('../models');

//get all the user education
module.exports.get = async (req, res) => {
    res.send({
        success: true,
        data: await Models.UserEducation.find({
            user: req.params.user,
        }),
    });
};

//get a single education experience
module.exports.show = async (req, res) => {
    const result = {};
    try {
        const education =
            await Models.UserEducation.find({
                user: req.params.user,
                _id: req.params.id,
            });
        res.status(200);
        result.success = true;
        result.data = education;
    } catch (error) {
        res.status(500);
        result.success = false;
        result.error = error.message;
    }
    res.send(result);
};

//create a education
module.exports.create = async (req, res) => {
    const result = {};
    let error_message = null;

    req.body.user = req.params.user;

    Models.UserEducation.create(
        req.body,
        async (error, education) => {
            if (!error) {
                try {
                    const user =
                        await Models.User.findByIdAndUpdate(
                            education.user, {
                                $addToSet: {
                                    education: education._id,
                                },
                            }
                        );
                    res.status(200);
                    result.success = true;
                    result.data = education;
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

//update an education
module.exports.update = async (req, res) => {
    const result = {};
    try {
        const education =
            await Models.UserEducation.findOneAndUpdate({
                    user: req.params.user,
                    _id: req.params.id,
                },
                req.body, {
                    returnOriginal: false
                }
            );
        res.status(200);
        result.success = true;
        result.data = education;
    } catch (error) {
        res.status(500);
        result.error = error.message;
        result.success = false;
    }
    res.send(result);
};

//delete an education
module.exports.delete = async (req, res) => {
    const result = {};
    try {
        const user =
            await Models.User.findByIdAndUpdate(
                req.params.user, {
                    $pull: {
                        education: req.params.id,
                    },
                }
            );
        const delete_result =
            await Models.UserEducation.deleteOne({
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
