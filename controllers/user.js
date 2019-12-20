const User = require('../models/User');
const Exercise = require('../models/Exercise');
const moment = require("moment");

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
  const {username} = req.body;
  const newUser = new User({username, log: []});

  newUser.save()
    .then(data => {
      res.json({_id: data._id, username: data.username});
    })
    .catch(err => {
      if(err.code === 11000) {
        return next({status: 400, message: 'username taken'})
      } else {
        return next(err);
      }
    });
}

exports.addExercise = (req, res, next) => {
  const {userId, desc, dur, date } = req.body;
  const item = setExerciseObj(desc, dur, date);
  const newExercise = new Exercise(item);

  newExercise.save((err, entry) => {
    if (err) return next(err);
    User.findByIdAndUpdate(userId,
      {
        $push: {log: entry}
      },
      {new: true},
      (err, user) => {
        if (err) return next(err);
        if(!user) {
          entry.remove((err, d) => {
            if (err) return next(err);
          });
          return next({status: 400, message: 'user id not found'});
        }
        res.json({
         description: entry.description,
         duration: entry.duration,
         date: entry.date
        });
      });
  });
}

function setDateRange(from, to) {
  let expressions = {date: {}};

  if (from && isValidDate(from)) {
    expressions.date["$gte"] = new Date(from);
  }

  if (to && isValidDate(to)) {
    expressions.date["$lte"] = new Date(to);
  }
  return expressions;
}

exports.getExcerciseLog = (req, res, next) => {
  const { userId, from, to, limit } = req.query;
  let expressions = setDateRange(from, to);
  let populateQuery = {path: "log", select: "-_id -__v", options: {"limit": limit}};
  if (expressions) {
    populateQuery["match"] = expressions;
  }
  User.findById(userId, '-_id -__v -newdate')
    .populate(populateQuery)
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next({status: 400, message: 'user id not found'});
      res.json(user);
    });

  // User.findById(userId).exec().then(user => {
  //   if(!user) return next({status: 400, message: 'user id not found'});
  //   let log = user.exercise;
  //   if(from && isValidDate(from)) {
  //     console.log(from);
  //     log = log.filter(i => i.date >= new Date(from));
  //   }
  //   if(to && isValidDate(to)) {
  //     log = log.filter(i => i.date <= new Date(to));
  //   }
  //   if(limit && parseInt(limit, 10)) {
  //     log = log.slice(0, limit);
  //   }
  //   res.json(getLogResponse(user, log));
  // }).catch((err) => {
  //   return next(err);
  // });
}

exports.getUsers = (req, res, next) => {
  User.find({}).
  sort({newdate: -1}).
  select({username:1, _id:1}).
  exec((err, data) => {
    if (err) return next(err);
    if(!data) res.send('no users');
    res.json(data);
  });
}