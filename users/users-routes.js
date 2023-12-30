const router = require('express').Router();
const UsersController = require('./users-controllers');

router.post('/login', UsersController.login);
router.get('/', UsersController.getProfileInfo);
router.patch('/', UsersController.sendFriendRequest);
router.get('/:id', UsersController.getUserInfo);
router.post('/', UsersController.createUser);
router.get('/get/all', UsersController.getUsers);

module.exports = router;
