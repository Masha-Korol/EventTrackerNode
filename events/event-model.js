const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    posterFile: { type: String, required: false },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    venueId: { type: String, required: true },
    artistId: { type: String, required: true }},
    { id: true }
).set('toJSON', {virtuals: true});

const event = mongoose.model('event', eventSchema);

module.exports = event;
