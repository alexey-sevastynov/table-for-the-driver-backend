const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SalarySchema = new Schema({
  percent: { type: Number, required: true },
  rate: { type: Number, required: true },
});

const Salary = mongoose.model("Salary", SalarySchema);

module.exports = Salary;
