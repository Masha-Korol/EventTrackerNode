const chatModel = require('./chat-model');

module.exports = {
    getChatMessages: async (req, res) => {
        const chatId = req.params.id;

        const foundChat = await chatModel.findById(chatId);
        return res.status(200).json(foundChat);
    },
}
