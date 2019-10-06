const router = require('express').Router();
const userController = require('../../controllers/userController');

router.post('/exercise/new-user', userController.createUser);
router.post('/exercise/add', userController.addExercise);
router.get('/exercise/log', userController.getExcerciseLog);

module.exports = router;