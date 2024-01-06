const router = require('express').Router();
const UsersController = require('./users-controllers');
const {roleValidator} = require('../util/authorization-helper');

router.post('/login', UsersController.login);
router.get('/', UsersController.getProfileInfo);
router.patch('/', UsersController.sendFriendRequest);
router.get('/:id', UsersController.getUserInfo);
router.post('/', roleValidator(['admin']), UsersController.createUser);
router.get('/get/all', roleValidator(['admin']), UsersController.getUsers);

module.exports = router;
