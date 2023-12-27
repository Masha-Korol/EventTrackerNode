const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        eventName: {type: String, required: true},
        eventDescription: {type: String, required: true},
        date: {type: Date, required: true},
        startTime: {type: String, required: true},
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

const posterSchema = mongoose.Schema(
    {

    },
    {id: true}
).set('toJSON', {virtuals: true});

const posterModel = mongoose.model('poster', posterSchema);

module.exports = {eventModel, posterModel};
