const Models = require("../models");

//get all user volunteer experience
module.exports.get = async (req, res) => {
  res.send({
    success: true,
    data: await Models.UserVolunteer.find({
      user: req.params.user,
    }),
  });
};

//get a single volunteer experience
module.exports.show = async (req, res) => {
  const result = {};
  try {
    const volunteer = await Models.UserVolunteer.find({
      user: req.params.user,
      _id: req.params.id,
    });
    res.status(200);
    result.success = true;
    result.data = volunteer;
  } catch (error) {
    res.status(500);
    result.success = false;
    result.error = error.message;
  }
  res.send(result);
};

//create a volunteer experience
module.exports.create = async (req, res) => {
  const result = {};
  let error_message = null;

  req.body.user = req.params.user;

  Models.UserVolunteer.create(req.body, async (error, volunteer) => {
    if (!error) {
      try {
        const user = await Models.User.findByIdAndUpdate(volunteer.user, {
          $addToSet: {
            volunteer: volunteer._id,
          },
        });
        res.status(200);
        result.success = true;
        result.data = volunteer;
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
};

//update a volunteer experience
module.exports.update = async (req, res) => {
  const result = {};
  try {
    const volunteer = await Models.UserVolunteer.findOneAndUpdate(
      {
        user: req.params.user,
        _id: req.params.id,
      },
      req.body,
      { returnOriginal: false }
    );
    res.status(200);
    result.success = true;
    result.data = volunteer;
  } catch (error) {
    res.status(500);
    result.error = error.message;
    result.success = false;
  }
  res.send(result);
};

//delete an volunteer experience
module.exports.delete = async (req, res) => {
  const result = {};
  try {
    const user = await Models.User.findByIdAndUpdate(req.params.user, {
      $pull: {
        volunteer: req.params.id,
      },
    });
    const delete_result = await Models.UserVolunteer.deleteOne({
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
