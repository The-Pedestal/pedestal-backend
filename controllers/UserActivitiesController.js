const stream = require('getstream');
const Models = require('../models')
const STREAM_KEY = process.env.GETSTREAM_KEY;
const STREAM_SECRET = process.env.GETSTREAM_SECRET;
const getstream_client = stream.connect(STREAM_KEY, STREAM_SECRET);
const {
    REACTION_LIKE,
    REACTION_COMMENT
} = require('../constants/App');

module.exports.create = async (req, res) => {
    const result = {};
    const user = await Models.User.findById(req.params.user);
    const getstream_user_info = await getstream_client.user(user._id).get();
    const activity = await getstream_client
        .feed('users', user._id)
        .addActivity({
            object: {},
            actor: getstream_user_info,
            verb: req.body.verb,
            message: req.body.message,
            media: req.body.media,
            user: req.params.user,
            reference_id: null,
        });

    Models.UserActivity.create({
        activity_id: activity.id,
        verb: req.body.verb,
        message: req.body.message,
        media: req.body.media,
        user: req.params.user
    }, async (err, new_activity) => {
        await getstream_client.activityPartialUpdate({
            id: activity.id,
            set: {
                reference_id: new_activity._id
            }
        });

        result.success = true;
        result.data = new_activity;
        res.send(result);
    });
}

module.exports.update = async (req, res) => {
    const result = {};

    const changes = {
        message: req.body.message,
        media: req.body.media
    }

    const activity = await Models.UserActivity.findOneAndUpdate({
        _id: req.params.id,
        user: req.params.user
    }, changes);

    const updateResult = await getstream_client.activityPartialUpdate({
        id: activity.activity_id,
        set: changes
    });

    result.success = true;
    result.data = updateResult;
    res.send(result)
}

module.exports.delete = async (req, res) => {
    const user = await Models.User.findById(req.params.user);
    Models.UserActivity.findOneAndDelete({
        _id: req.params.id,
        user: req.params.user
    }, (err, activity) => {
        getstream_client
            .feed('users', user._id)
            .removeActivity(activity.activity_id);
        res.send();
    });
}

module.exports.reactToActivity = async (req, res) => {
    const {
        reaction_type,
        owner_id,
        activity_id,
        options
    } = req.body;

    const user = await Models.User.findOne({_id: req.params.user });

    if ([REACTION_LIKE, REACTION_COMMENT].includes(reaction_type)) {

        await getstream_client.reactions.add(reaction_type, activity_id, options, {
            userId: user._id
        });

        /** notify the owner of the activity that someone reacted to it */
        if (reaction_type === REACTION_LIKE) {

        }

        if (reaction_type === REACTION_COMMENT) {

        }

        res.status(200).send();
    } else {
        res.status(500).send({
            success: false,
            error: `unknown reaction type '${reaction_type}'`,
        });
    }
}

module.exports.reactToReaction = async (req, res) => {

}
