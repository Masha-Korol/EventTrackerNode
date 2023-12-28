const userModel = require('./../users/user-model');
const {chatModel} = require('./../chats/chat-model');

module.exports = {
    getProfileInfo: async (req, res) => {
        // get user from auth context
        const currentUserId = '658cbde710161d4ee9a9ac35';

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

        const userResult = {userName: user.userName};

        userResult.userEvents = [];
        user.events.forEach(event => {
            userResult.userEvents.push({id: event.id, eventName: event.eventName, city: event.venueId.cityId.cityName, date: event.date.toLocaleDateString()});
        });

        userResult.userMessages = [];
        const chats = await chatModel.find({})
            .populate('users');
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

        //TODO
        userResult.isAdmin = true;

        return res.status(200).json(userResult);
    },

    getUserInfo: async (req, res) => {
        const userId = req.params.id;

        // get user from auth context
        const currentUserId = '658cbde710161d4ee9a9ac35';
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
        // get user from auth context
        const currentUserId = '658cbde710161d4ee9a9ac35';

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
}
