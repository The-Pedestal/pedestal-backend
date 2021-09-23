const stream = require("getstream")
const Models = require("../models")
const STREAM_KEY = process.env.GETSTREAM_KEY
const STREAM_SECRET = process.env.GETSTREAM_SECRET
const gs_client = stream.connect(STREAM_KEY, STREAM_SECRET)
const { REACTION_LIKE, REACTION_COMMENT } = require("../constants/App")

module.exports.get = async (req, res) => {
    const result = {}
    try {
        const activities = await Models.UserActivity.find({})
        res.status(200)
        result.success = true
        result.data = activities
    } catch (error) {
        res.status(500)
        result.success = false
        result.error = error.message
    }
    res.send(result)
}

module.exports.show = async (req, res) => {
    const result = {}
    try {
        const activity = await Models.UserActivity.findById(req.params.id)
        res.status(200)
        result.success = true
        result.data = activity
    } catch (error) {
        res.status(500)
        result.success = false
        result.error = error.message
    }
    res.send(result)
}

module.exports.createReaction = async (req, res) => {
    const { actor, reaction_type, options } = req.body
    const { activity_id } = req.params

    if ([REACTION_LIKE, REACTION_COMMENT].includes(reaction_type)) {
        const actor_info = await Models.User.findOne({ _id: actor })
        const activity = await Models.UserActivity.findOne({ _id: activity_id })
        const activity_owner = activity.user
        let message = null

        await gs_client.reactions.add(
            reaction_type,
            activity.reference_id,
            options,
            {
                userId: actor_info._id,
            }
        )

        if (reaction_type === REACTION_LIKE) {
            message = `${actor_info.full_name} liked your post.`
        }

        if (reaction_type === REACTION_COMMENT) {
            message = `${actor_info.full_name} commented on your post.`
        }

        /** notify the owner of the activity that someone reacted to it */
        await gs_client.feed("notifications", activity_owner._id).addActivity({
            actor: await gs_client.user(actor_info._id).get(),
            verb: reaction_type,
            object: await gs_client.collections.add("reactions", null, {
                activity_id: activity_id,
                message: message,
                link: `profile/${activity_owner._id}/posts/${activity_id}`,
            }),
        })

        res.status(200).send()
    } else {
        res.status(500).send({
            success: false,
            error: `unknown reaction type '${reaction_type}'`,
        })
    }
}

module.exports.updateReaction = async (req, res) => {
    /** @TODO moved the updating of reaction from front end to backend */
    res.send()
}

module.exports.deleteReaction = async (req, res) => {
    /** @TODO moved the updating of reaction from front end to backend */
    res.send()
}
