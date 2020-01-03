const Exercise = require('../models/Exercise');
const moment = require("moment");

exports.editExerciseEntry = (req, res, next) => {
  const { exId } = req.body;
  console.log("Editing exercise: " + exId);
}
