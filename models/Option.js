const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  customer: { type: String, required: true },
  hour: { type: Number, required: true },
  km: { type: Number, required: true },
});

const Option = mongoose.model("Option", OptionSchema);

module.exports = Option;
