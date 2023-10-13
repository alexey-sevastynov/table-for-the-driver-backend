const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  dateStart: { type: Date, required: true },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
