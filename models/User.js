const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

let UserSchema = new Schema({
  _id: {type: String, default: shortid.generate},
  newdate: {type: Date, default: Date.now},
  username: {type: String, unique: true, required: true},
  log: [{type: String, ref: 'Exercise'}]
});

module.exports = mongoose.model('User', UserSchema);
