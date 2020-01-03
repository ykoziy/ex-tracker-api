const Exercise = require('../models/Exercise');
const moment = require("moment");


exports.getExerciseEntry = (req, res, next) => {
  const { exId } = req.query;
  Exercise.findById(exId, '-__v', (err, entry) => {
    if (err) return next(err);
    if (!entry) return next({status: 400, message: 'exercise id not found'});
    res.json(entry);
  });
}

exports.editExerciseEntry = (req, res, next) => {
  const { exId } = req.body;
  console.log("Editing exercise: " + exId);
}
