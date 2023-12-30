const userModel = require('./../users/user-model');
const {eventModel} = require('./../events/event-model');

module.exports = {
    getRecommendations: async (req, res) => {
        // get user from auth context
        const currentUserId = '65900dacf252cbe183316218';
        const currentUser = await userModel.findById(currentUserId);

        // generate

        const recommendedUsersResult = [];
        const users = await userModel.find({});
        for (const user of users) {
            if (currentUser.id !== user.id && !currentUser.friends.includes(user.id)) {
                recommendedUsersResult.push({id: user.id, userName: user.userName});
            }
        }

        const recommendedEventsResult = [];
        const events = await eventModel.find({})
            .populate({
                path: 'venueId',
                populate: {
                    path: 'cityId',
                    model: 'city'
                }
            });
        for (const event of events) {
            if (!currentUser.events.includes(event.id)) {
                recommendedEventsResult.push({id: event.id, eventName: event.eventName, city: event.venueId.cityId.cityName, date: event.date.toLocaleString()});
            }
        }

        return res.status(200).json({
            recommendedEvents: recommendedEventsResult,
            recommendedUsers: recommendedUsersResult
        });
    },
}
