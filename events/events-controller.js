const {eventModel, markModel} = require('./event-model');
const userModel = require('./../users/user-model');

module.exports = {
    getEvents: async (req, res) => {
        const eventsResults = [];
        const events = await eventModel.find({});

        //TODO posterFile ???
        for (const event of events) {
            eventsResults.push({id: (await event).id, posterFile: 'gorillaz.jpg'});
        }

        return res.status(200).json(eventsResults);
    },

    getEvent: async (req, res) => {
        const eventId = req.params.id;

        const resultEvent = {};
        let event = await eventModel.findById(eventId)
            .populate({
                path: 'venueId',
                populate: {
                    path: 'cityId',
                    model: 'city'
                }
            })
            .populate('artistId')
            .populate('comments');

        resultEvent.id = event.id;
        resultEvent.eventName = event.eventName;
        resultEvent.date = event.date.toLocaleDateString();
        resultEvent.start = event.startTime;
        resultEvent.city = event.venueId.cityId.cityName;
        resultEvent.venue = event.venueId.venueName;

        resultEvent.eventComments = [];
        event.comments.forEach(comment => {
            resultEvent.eventComments.push({id: comment.id, userName: comment.userName, text: comment.text, date: comment.date.toLocaleDateString()});
        });

        // get user from authentication context
        const userId = '658cbde710161d4ee9a9ac35';
        const user = await userModel.findById(userId);
        resultEvent.willGo = user.events.includes(eventId);

        //TODO
        resultEvent.posterFile = 'gorillaz.jpg';

        const mark = await markModel.findOne({userId, eventId});
        resultEvent.mark = !mark ? undefined : mark.mark;

        return res.status(200).json(resultEvent);
    },

    createEvent: async (req, res) => {
        const payload = req.body;
        const eventName = payload.eventName;
        const eventDescription = payload.eventDescription;
        const date = payload.date;
        const startTime = payload.startTime;
        const venueId = payload.venueId;
        const artistId = payload.artistId;

        const createdEvent = await eventModel.create(req.body);

        console.log(`Event was created: ${JSON.stringify(createdEvent)}`);
        return res.status(200).json(createdEvent);
    },

    uploadEventPoster: async (req, res) => {
        console.log(`Files got: ${JSON.stringify(req.files.length)}`);
    },

    updateEvent: (req, res) => {
        const eventId = req.params.id;
        const payload = req.body;

        // modify in the db
        const updatedEvent = eventModel.findByIdAndUpdate(eventId, payload);

        console.log(`Event was updated: ${JSON.stringify({
            id: eventId,
            eventName: payload.eventName,
            eventDescription: payload.eventDescription
        })}`);
        return res.status(200).json(updatedEvent);
    },

    deleteEvent: async (req, res) => {
        const eventId = req.params.id;

        // modify in the db
        eventModel.findByIdAndDelete(eventId);

        console.log(`Event '${eventId}' was deleted`);
        return res.status(200);
    },

    modifyEventState: async (req, res) => {
        const eventId = req.params.id;
        // get user from authentication context
        const userId = '658cbde710161d4ee9a9ac35';

        const user = await userModel.findById(userId);
        if (user.events.includes(eventId)) {
            await userModel.findByIdAndUpdate(userId,
                {$pull: {events: eventId}},
                {new: true, useFindAndModify: false});
        } else {
            await userModel.findByIdAndUpdate(userId,
                {$push: {events: eventId}},
                {new: true, useFindAndModify: false});
        }

        console.log(`Event '${eventId}' state was modified for user '${userId}'`);
        return res.status(200);
    },

    modifyEventRank: async (req, res) => {
        const eventId = req.params.id;
        const payload = req.body;
        // get user from authentication context
        const userId = '658cbde710161d4ee9a9ac35';
        const newMark = payload.newMark;

        const mark = await markModel.findOne({userId, eventId});
        if (!mark) {
            await markModel.create({userId, eventId, mark: newMark});
        } else {
            await markModel.findByIdAndUpdate(mark.id, {userId, eventId, mark: newMark});
        }

        console.log(`Rank was changed to '${newMark}' for the event '${eventId}' for user '${userId}'`);
        return res.status(200).json({});
    },
}
