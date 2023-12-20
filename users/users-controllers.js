module.exports = {
    getProfileInfo: (req, res) => {
        // get user from auth context
        const userName = '';

        // get from the db

        return res.status(200).json({
            userName: 'Masha',
            userEvents: [
                {id: 1, eventName: 'event1', city: 'Воронеж', date: '12/22/2028'},
                {id: 2, eventName: 'event2', city: 'Москва', date: '13/22/2028'}
            ],
            userFriends: [
                {id: 1, userName: 'friendElf'},
                {id: 2, userName: 'friendHobbit'},
                {id: 3, userName: 'boyfriend'},
            ],
            userMessages: [
                {id: 1, userName: 'friendElf', lastMessage: 'Hey. How are you?', chatId: 2},
                {id: 2, userName: 'boyfriend', lastMessage: 'I miss you (', chatId: 3}
            ],
            isAdmin: true
        });
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

    sendFriendRequest: (req, res) => {
        const payload = req.body;
        const userId = payload.userId;
        // get user from auth context
        const currentUserName = '';

        // update the db

        console.log(`Friend request was sent by user '${currentUserName}' to user '${userId}'`);
        return res.status(200).json({});
    }
}
