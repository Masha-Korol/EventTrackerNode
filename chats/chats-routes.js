const router = require('express').Router();
const ChatsController = require("../chats/chats-controllers");

router.get('/:id', ChatsController.getChatMessages);

module.exports = router;
