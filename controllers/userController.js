const User = require('../models/user');
const  moment = require("moment");

exports.createUser = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, data) => {
    if (err) {
      if(err.code === 11000) {
        return next({status: 400, message: 'username taken'})
      } else {
        return next(err);
      }
    } else {
      res.json({username: data.username, uid: data.uid});
    }
  });
}

exports.addExcercise = (req, res) => {
  res.send('POST: addExcercise not implemented');
}

exports.getExcerciseLog = (req, res) => {
  res.send('GET: getExcerciseLog not implemented');
}