const eventModel = require('./event-model');

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

        const foundEvent = await eventModel.findById(eventId);

        //TODO
        foundEvent.posterFile = 'gorillaz.jpg';

        //TODO get from other tables
        foundEvent.willGo = true;
        foundEvent.mark = 5;
        foundEvent.eventComments = [
            {id: 1, userName: 'myfriend', text: 'HELLO', date: '12/12/2022'},
            {id: 1, userName: 'anotherFriend', text: 'liked this concert A LOT!', date: '10/05/2020'},
        ];

        return res.status(200).json(foundEvent);
    },

    createEvent: async (req, res) => {
        const payload = req.body;
        const eventName = payload.eventName;
        const eventDescription = payload.eventDescription;
        const date = payload.date;
        const startTime = payload.startTime;
        const artistId = payload.artistId;
        const venueId = payload.venueId;

        const createdEvent = await eventModel.create(req.body);

        console.log(`Event was created: ${JSON.stringify({
            id: 1, eventName, eventDescription, date, startTime, artistId, venueId
        })}`);
        return res.status(200).json(createdEvent);
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
