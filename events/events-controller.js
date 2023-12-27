const {eventModel} = require('./event-model');

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

        //TODO
        resultEvent.posterFile = 'gorillaz.jpg';

        //TODO get from other tables
        resultEvent.willGo = true;
        resultEvent.mark = 5;

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

        console.log(`Event was created: ${JSON.stringify({
            id: 1, eventName, eventDescription, date, startTime, artistId, venueId
        })}`);
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

    modifyEventState: (req, res) => {
        const eventId = req.params.id;
        // get user from authentication context
        const userId = '';

        // modify in the db

        console.log(`Event '${eventId}' state was modified for user '${userId}'`);
        return res.status(200);
    },

    modifyEventRank: (req, res) => {
        const eventId = req.params.id;
        const payload = req.body;
        // get user from authentication context
        const userId = '';
        const newMark = payload.newMark;

        // modify in the db

        console.log(`Rank was changed to '${newMark}' for the event '${eventId}' for user '${userId}'`);
        return res.status(200).json({});
    },
}
