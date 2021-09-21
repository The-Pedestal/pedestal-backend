const mongoose = require("mongoose");
const Timestamps = require("./commons/Timestamps");
const Schema = mongoose.Schema;

module.exports = new Schema({
  organization: { type: String, required: true },
  role: { type: String, required: true },
  cause: String,
  description: String,
  start_date: Date,
  end_date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  ...Timestamps,
});
