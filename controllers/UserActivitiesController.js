const stream = require("getstream")
const Models = require("../models")
const STREAM_KEY = process.env.GETSTREAM_KEY
const STREAM_SECRET = process.env.GETSTREAM_SECRET
const gs_client = stream.connect(STREAM_KEY, STREAM_SECRET)

module.exports.create = async (req, res) => {
    const result = {}
    const actor = await Models.User.findById(req.params.user)

    Models.UserActivity.create(
        {
            verb: req.body.verb,
            message: req.body.message,
            media: req.body.media,
            user: actor._id,
        },
        async (err, new_activity) => {
            const gs_activity = await gs_client
                .feed("users", actor._id)
                .addActivity({
                    actor: await gs_client.user(actor._id).get(),
                    verb: req.body.verb,
                    object: await gs_client.collections.add(
                        "posts",
                        new_activity._id,
                        {
                            message: new_activity.message,
                            media: new_activity.media,
                        }
                    ),
                })
            await Models.UserActivity.findOneAndUpdate(
                {
                    _id: new_activity._id,
                },
                {
                    reference_id: gs_activity.id,
                }
            )

            result.success = true
            result.data = new_activity
            res.send(result)
        }
    )
}

module.exports.update = async (req, res) => {
    const result = {}
    const changes = {
        message: req.body.message,
        media: req.body.media,
    }
    const activity = await Models.UserActivity.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.params.user,
        },
        changes
    )

    const update_result = await gs_client.collections.update(
        "posts",
        activity._id,
        changes
    )

    result.success = true
    result.data = update_result
    res.send(result)
}

module.exports.delete = async (req, res) => {
    const user = await Models.User.findById(req.params.user)
    Models.UserActivity.findOneAndDelete(
        {
            _id: req.params.id,
            user: req.params.user,
        },
        (err, activity) => {
            gs_client
                .feed("users", user._id)
                .removeActivity(activity.activity_id)
            res.send()
        }
    )
}
