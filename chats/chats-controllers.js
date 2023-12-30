const {chatModel, messageModel} = require('./chat-model');
const userModel = require('./../users/user-model');

module.exports = {
    getChat: async (req, res) => {
        const userId = req.params.userId;
        const currentUserId = req.currentUserId;

        let chatWithThisUser;
        const chats = await chatModel.find({});
        for (const chat of chats) {
            if (chat.users.includes(currentUserId) && chat.users.includes(userId)) {
                chatWithThisUser = chat;
                break;
            }
        }

        if (!chatWithThisUser) {
            chatWithThisUser = await chatModel.create({users: [currentUserId, userId]});
        }

        const chat = await chatModel.findById(chatWithThisUser.id)
            .populate('users')
            .populate({
                path: 'messages',
                populate: {
                    path: 'authorUser',
                    model: 'user'
                }
            });

        const user = chat.users.filter(user => user.id!== currentUserId)[0];
        const chatResult = {userName: user.userName};

        chatResult.messages = [];
        for (const message of chat.messages) {
            chatResult.messages.push({text: message.text, userName: message.authorUser.userName, date: message.date.toLocaleString(),
                isCurrentUserAuthor: message.authorUser.id === currentUserId});
        }

        return res.status(200).json(chatResult);
    },

    sendMessage: async (req, res) => {
        const userId = req.params.userId;
        const payload = req.body;
        const text = payload.text;

        // get user from authentication context
        const currentUserId = req.currentUserId;
        const currentUserName = req.currentUserName;

        const createdMessage = await messageModel.create({authorUser: currentUserId, text: text, date: new Date()});

        let chatWithThisUser;
        const chats = await chatModel.find({});
        for (const chat of chats) {
            if (chat.users.includes(currentUserId) && chat.users.includes(userId)) {
                chatWithThisUser = chat;
                break;
            }
        }

        if (chatWithThisUser) {
            await chatModel.findByIdAndUpdate(chatWithThisUser.id,
                {
                    $push: {messages: createdMessage},
                    lastMessageText: text
                },
                {new: true, useFindAndModify: false});

            return res.status(200).json({id: createdMessage.id, userName: currentUserName, text: createdMessage.text, date: createdMessage.date.toLocaleString(),
                isCurrentUserAuthor: true});
        }
    }
}
