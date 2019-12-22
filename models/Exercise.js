const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const shortid = require("shortid");

const getCurrentDate = () => {
  return moment().format('YYYY-MM-DD');
}

let ExerciseSchema = new Schema({
  _id: {type: String, default: shortid.generate},
  description: {type: String, required: true},
  duration: {type: String, required: true},
  date: {type: Date, default: getCurrentDate}
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
