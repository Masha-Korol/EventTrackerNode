const router = require('express').Router();
const UsersController = require('./users-controllers');

router.get('/', UsersController.getProfileInfo);
router.patch('/', UsersController.sendFriendRequest);
router.get('/:username', UsersController.getUserInfo);

module.exports = router;
