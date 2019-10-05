const router = require('express').Router();
const userController = require('../../controllers/userController');

router.post('/exercise/new-user', userController.createUser);
router.post('/exercise/add', userController.addExcercise);
router.get('/exercise/log', userController.getExcerciseLog);

module.exports = router;