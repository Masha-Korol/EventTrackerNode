const userModel = require('./../users/user-model');

module.exports = {
    getProfileInfo: async (req, res) => {
        // get user from auth context
        const userId = '658cbde710161d4ee9a9ac35';

        const userResult = {};
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
            })
            .populate('friends');
        userResult.userName = user.userName;

        userResult.userEvents = [];
        user.events.forEach(event => {
            userResult.userEvents.push({id: event.id, eventName: event.eventName, city: event.venueId.cityId.cityName, date: event.date.toLocaleDateString()});
        });

        userResult.userFriends = [];
        user.friends.forEach(friend => {
            userResult.userFriends.push({id: friend.id, userName: friend.userName, lastMessage: 'I miss you (', chatId: 1});
        });

        userResult.isAdmin = true;

        return res.status(200).json(userResult);
    },

    getUserInfo: (req, res) => {
        const userId = req.params.id;

        // get from the db

        return res.status(200).json({
            userName: userId,
            isUserFriend: true,
            userEvents: [
                {id: 1, 'eventName': 'event33', 'city': 'Владивосток', 'date': '12/12/2007'},
                {id: 2, 'eventName': 'event11', 'city': 'Воронеж', 'date': '25/12/2009'},
                {id: 3, 'eventName': 'event112', 'city': 'Сочи', 'date': '11/12/2010'},
                {id: 4, 'eventName': 'event123', 'city': 'Сочи', 'date': '01/12/2022'}
            ]
        });
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
            // remove from friends
            if (currentUser.friends.includes(userId)) {
                await userModel.findByIdAndUpdate(currentUser.id,
                    {$pull: {friends: userId}},
                    {new: true, useFindAndModify: false});
            }
        }

        console.log(`Friend request was sent by user '${currentUserId}' to user '${userId}'`);
        return res.status(200).json({});
    },

    acceptFriendRequest: (req, res) => {
        const payload = req.body;
        const userId = payload.userId;
        // get user from auth context
        const currentUserId = '658cbde710161d4ee9a9ac35';

        // update the db

        console.log(`Friend request was accepted by user '${currentUserId}' to user '${userId}'`);
        return res.status(200).json({});
    }
}
