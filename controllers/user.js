const User = require('../models/user');
const  moment = require("moment");

const setExerciseObj = (desc, dur, date) => {
  const item = {
    description: desc,
    duration: dur,
  };
  if (date !== '') {
    if (moment().isValid()) {
      item.date = date;
    }
  }
  return item;
}

const isValidDate = (date) => {
  return moment(date,'YYYY-MM-DD', true).isValid();
}

const getLogResponse = (user, log) => {
  const result = {username: user.username, uid: user.uid};
  result.count = log.length;
  let ex = log.toObject();
  ex.forEach(i => {
    delete i._id;
  });
  result.log = ex;
  return result;
}

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
      res.json({_id: data._id, username: data.username});
    }
  });
}

exports.addExercise = (req, res, next) => {
  const {userId, desc, dur, date } = req.body;
  const item = setExerciseObj(desc, dur, date);

  User.findById(userId, (err, user) => {
    if (err) return next(err);
    if(!user) {
      return next(
        {status: 400, message: 'user id not found'}
      );
    }
    user.exercise.push(item);
    user.save((err, data) => {
      if (err) return next(err);
      let lastItem = data.exercise.slice(-1)[0];
      res.json({
        description:lastItem.description,
        duration:lastItem.duration,
        date: lastItem.date
      });
    });
  });
}

exports.getExcerciseLog = (req, res, next) => {
  const { userId, from, to, limit } = req.query;

  User.findById(userId).exec().then(user => {
    if(!user) return next({status: 400, message: 'user id not found'});
    let log = user.exercise;
    if(from && isValidDate(from)) {
      console.log(from);
      log = log.filter(i => i.date >= new Date(from));
    }
    if(to && isValidDate(to)) {
      log = log.filter(i => i.date <= new Date(to));
    }
    if(limit && parseInt(limit, 10)) {
      log = log.slice(0, limit);
    }
    res.json(getLogResponse(user, log));
  }).catch((err) => {
    return next(err);
  });
}

exports.getUsers = (req, res, next) => {
  User.find({}).
  select({username:1, _id:1}).
  exec((err, data) => {
    if (err) return next(err);
    if(!data) res.send('no users');
    res.json(data);
  });
}