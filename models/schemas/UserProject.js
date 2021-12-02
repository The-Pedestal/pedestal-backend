const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    //who does the project belong to
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});
