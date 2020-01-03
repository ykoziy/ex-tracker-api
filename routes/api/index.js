const router = require('express').Router();
const userController = require('../../controllers/user');
const exerciseController = require('../../controllers/exercise');

router.post('/exercise/new-user', userController.createUser);
router.post('/exercise/add', userController.addExercise);
router.get('/exercise/log', userController.getExerciseLog);
router.get('/exercise/entry', userController.getExerciseEntry);
router.get('/exercise/users', userController.getUsers);
router.put('/exercise/edit', exerciseController.editExerciseEntry)

module.exports = router;
