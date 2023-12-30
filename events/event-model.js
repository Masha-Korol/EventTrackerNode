const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        eventName: {type: String, required: true},
        eventDescription: {type: String, required: true},
        date: {type: Date, required: true},
        startTime: {type: String, required: true},
        eventPosterFileName: {type: String, required: true},
        venueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'venue'
        },
        artistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'artist'
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }]
    },
    {id: true}
).set('toJSON', {virtuals: true});

const eventModel = mongoose.model('event', eventSchema);

const markSchema = new mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    },
    mark: {type: Number, required: true}
},
    {id: true}
).set('toJSON', {virtuals: true});

const markModel = mongoose.model('mark', markSchema);

module.exports = {eventModel, markModel};
