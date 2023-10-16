const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date },
  customer: { type: String, required: true },
  pointStart: { type: String, require: true },
  pointEnd: { type: String },
  car: { type: String, require: true },
  description: { type: String },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
