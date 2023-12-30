const userModel = require('./../users/user-model');
const {chatModel} = require('./../chats/chat-model');
const {authenticate} = require('../util/authentication-helper');

module.exports = {
    login: async (req, res) => {
        const payload = req.body;
        const userName = payload.userName;
        const password = payload.password;

        const currentUser = await authenticate(userName, password);
        if (!currentUser) {
            return res.status(403).json({});
        }

        return res.status(200).json({userName, password});
    },

    getProfileInfo: async (req, res) => {
        const currentUserId = req.currentUserId;

        const user = await userModel.findById(currentUserId)
            .populate({
                path: 'events',
                populate: {
                    path: 'venueId',
                    populate: {
                        path: 'cityId',
                        model: 'city'
                    }
                }
            })
            .populate('friends');

        const userResult = {userName: user.userName, isAdmin: user.isAdmin};

        userResult.userEvents = [];
        user.events.forEach(event => {
            userResult.userEvents.push({id: event.id, eventName: event.eventName, city: event.venueId.cityId.cityName, date: event.date.toLocaleDateString()});
        });

        userResult.userMessages = [];
        const chats = await chatModel.find({}).populate('users');
        for (const chat of chats) {
            if (chat.users.map(chatUser => chatUser.id).includes(currentUserId)) {
                const user = chat.users.filter(user => user.id!== currentUserId)[0];
                userResult.userMessages.push({chatId: chat.id, userId: user.id, userName: user.userName, lastMessage: chat.lastMessageText});
            }
        }

        userResult.userFriends = [];
        user.friends.forEach(friend => {
            userResult.userFriends.push({id: friend.id, userName: friend.userName});
        });

        return res.status(200).json(userResult);
    },

    getUserInfo: async (req, res) => {
        const userId = req.params.id;

        const currentUserId = req.currentUserId;
        const currentUser = await userModel.findById(currentUserId);

        const user = await userModel.findById(userId)
            .populate({
                path: 'events',
                populate: {
                    path: 'venueId',
                    populate: {
                        path: 'cityId',
                        model: 'city'
                    }
                }
            });

        const userResult = {id: user.id, userName: user.userName, isUserFriend: currentUser.friends.includes(userId)};

        userResult.userEvents = [];
        for (const event of user.events) {
            userResult.userEvents.push({id: event.id, eventName: event.eventName, city: event.venueId.cityId.cityName, date: event.date.toLocaleString()});
        }

        return res.status(200).json(userResult);
    },

    sendFriendRequest: async (req, res) => {
        const payload = req.body;
        const userId = payload.userId;
        const friendUser = payload.friendUser;
        const currentUserId = req.currentUserId;

        const currentUser = await userModel.findById(currentUserId);

        if (friendUser) {
            if (!currentUser.friends.includes(userId)) {
                await userModel.findByIdAndUpdate(currentUser.id,
                    {$push: {friends: userId}},
                    {new: true, useFindAndModify: false});
            }
        } else {
            if (currentUser.friends.includes(userId)) {
                await userModel.findByIdAndUpdate(currentUser.id,
                    {$pull: {friends: userId}},
                    {new: true, useFindAndModify: false});
            }
        }

        console.log(`Friend request was sent by user '${currentUserId}' to user '${userId}'`);
        return res.status(200).json({});
    },

    getUsers: async (req, res) => {
        const users = await userModel.find({});
        return res.status(200).json(users);
    },

    createUser: async (req, res) => {
        const payload = req.body;
        const userName = payload.userName;
        const password = payload.password;
        const isAdmin = payload.isAdmin;

        const createdUser = await userModel.create({userName, password, isAdmin});

        return res.status(200).json({id: createdUser.id, userName, isAdmin});
    }
}
