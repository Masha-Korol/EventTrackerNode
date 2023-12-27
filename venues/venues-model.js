const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    venueName: { type: String, required: true },
    cityId: { type: String, required: true }
}).set('toJSON', {
    virtuals: true
});

const venue = mongoose.model('venue', venueSchema);

module.exports = venue;