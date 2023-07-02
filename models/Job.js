const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    id: {
      type: Number,
      //necessary
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    route: String,
    hours: {
      type: Number,
      required: true,
    },
    km: {
      type: Number,
      required: true,
    },
    income: Number,
    expenditure: Number,
    status: {
      type: Number, // 0 | 1 | 2 | 3
      required: true,
    },
  },
  {
    timestamps: true, // new unique date create
  }
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
