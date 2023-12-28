const router = require('express').Router();
const UsersController = require('./users-controllers');

router.get('/', UsersController.getProfileInfo);
router.patch('/', UsersController.sendFriendRequest);
router.patch('/accept', UsersController.acceptFriendRequest);
router.get('/:id', UsersController.getUserInfo);

module.exports = router;
