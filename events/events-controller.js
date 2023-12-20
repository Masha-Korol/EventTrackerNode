module.exports = {
    getEvents: (req, res) => {
        // get from the db

        return res.status(200).json([
            {id: 1, posterFile: 'gorillaz.jpg'},
            {id: 2, posterFile: 'mychemicalromance.jpg'},
            {id: 3, posterFile: 'placebo.jpg'},
        ]);
    },

    getEvent: (req, res) => {
        const eventId = req.params.id;

        // get from the db

        return res.status(200).json({
            id: 1,
            eventName: 'event1',
            eventDescription: 'very cool event',
            posterFile: 'gorillaz.jpg',
            date: '11/20/2018',
            city: 'Москва',
            venue: 'Event Hall',
            start: '19:00',
            willGo: true,
            mark: 4,
            eventComments: [
                {id: 1, userName: 'friend', text: 'Very good! I liked it!', date: '12/13/2000 11:28 am'},
                {id: 2, userName: 'user123', text: 'I enjoyed it', date: '12/13/2000 11:28 am'},
            ]
        });
    },

    createEvent: (req, res) => {
        const payload = req.body;
        const eventName = payload.eventName;
        const eventDescription = payload.eventDescription;
        const date = payload.date;
        const startTime = payload.startTime;
        const artistId = payload.artistId;
        const venueId = payload.venueId;

        // modify in the db

        console.log(`Event was created: ${JSON.stringify({
            id: 1, eventName, eventDescription, date, startTime, artistId, venueId
        })}`);
        return res.status(200).json({
            id: 1,
            eventName: eventName,
            eventDescription: eventDescription
        });
    },

    updateEvent: (req, res) => {
        const eventId = req.params.id;
        const payload = req.body;

        // modify in the db

        console.log(`Event was updated: ${JSON.stringify({
            id: eventId,
            eventName: payload.eventName,
            eventDescription: payload.eventDescription
        })}`);
        return res.status(200).json({
            id: eventId,
            eventName: payload.eventName,
            eventDescription: payload.eventDescription
        });
    },

    deleteEvent: (req, res) => {
        const eventId = req.params.id;

        // modify in the db

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
