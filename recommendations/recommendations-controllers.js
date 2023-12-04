module.exports = {
    getRecommendations: (req, res) => {
        // get user from auth context
        const user = '';

        // generate

        return res.status(200).json({
            recommendedEvents: [
                {id: 1, 'eventName': 'event33', 'city': 'Владивосток', 'date': '12/12/2012'},
                {id: 2, 'eventName': 'event231', 'city': 'Питер', 'date': '04/12/2012'}
            ],
            recommendedUsers: [
                {id: 1, 'userName': 'admin'},
                {id: 2, 'userName': 'unknown'},
                {id: 3, 'userName': 'Marina'},
            ]
        });
    },
}
