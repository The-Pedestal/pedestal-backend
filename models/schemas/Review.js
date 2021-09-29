const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema(
    {
        title: { type: String }, // title is optional
        content: { type: String },
        rating: { type: Number }, // 1-5
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        //get engagement dates from mentorship
        mentorship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "mentorship",
        },
        mentor: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        mentee: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        //foreign key for mentorship engagement and each user in the mentorship
    },
    { timestamps: true },
);
