const Exercise = require('../models/Exercise');
const moment = require("moment");

const setExerciseObj = (desc, dur, date) => {
  const item = {};
  if (desc !== '') {
    item.description = desc;
  }
  if (dur !== '') {
    item.duration = dur;
  }
  if (date !== '') {
    if (moment().isValid()) {
      item.date = date;
    }
  }
  return item;
}

exports.getExerciseEntry = (req, res, next) => {
  const { exId } = req.query;
  Exercise.findById(exId, '-__v', (err, entry) => {
    if (err) return next(err);
    if (!entry) return next({status: 400, message: 'exercise id not found'});
    res.json(entry);
  });
}

exports.editExerciseEntry = (req, res, next) => {
  const { exId, desc, dur, date } = req.body;
  const item = setExerciseObj(desc, dur, date);
  Exercise.findByIdAndUpdate(exId, item, {new: true}, (err, entry) => {
    if (err) return next(err);
    if (!entry) return next({status: 400, message: 'exercise id not found'});
    res.json(entry);
  });
}
