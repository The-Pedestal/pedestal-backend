const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Timestamps = require("./commons/Timestamps");

module.exports = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "",
  },
  employment_type: String,
  employment_status: String,
  description: {
    type: String,
    default: "",
  },
  current_job: {
    type: Boolean,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
