const router = require('express').Router();
const userController = require('../../controllers/user');

router.post('/exercise/new-user', userController.createUser);
router.post('/exercise/add', userController.addExercise);
router.get('/exercise/log', userController.getExerciseLog);
router.get('/exercise/users', userController.getUsers);

module.exports = router;
