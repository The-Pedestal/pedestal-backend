const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Timestamps = require("./commons/Timestamps");

module.exports = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    connected_user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    status: {
        type: String,
        default: "pending",
        values: ["pending", "connected"],
    },
    ...Timestamps,
});
