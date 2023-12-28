const router = require('express').Router();
const ChatsController = require('../chats/chats-controllers');

router.get('/:userId', ChatsController.getChat);
router.post('/:userId', ChatsController.sendMessage);

module.exports = router;
