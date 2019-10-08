const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");
const moment = require("moment");

const getCurrentDate = () => {
  return moment().format('YYYY-MM-DD');
}

let UserSchema = new Schema({
  _id: {type: String, default: shortid.generate},
  username: {type: String, unique: true, required: true},
  exercise: [
    {
      description: String,
      duration: String,
      date: {type: Date, default: getCurrentDate}
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);