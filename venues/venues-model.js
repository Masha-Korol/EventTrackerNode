const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema(
    {
        venueName: {type: String, required: true},
        cityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'city'
        }
    },
    {id: true}
).set('toJSON', {virtuals: true});

const venueModel = mongoose.model('venue', venueSchema);

module.exports = venueModel;
