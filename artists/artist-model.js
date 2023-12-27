const mongoose = require('mongoose');

const artistSchema = mongoose.Schema(
    {
        artistName: {
            type: String,
            required: true,
        },
        artistDescription: {
            type: String,
            required: false,
        }
    },
    { id: true }
).set('toJSON', {virtuals: true});


const artist = mongoose.model('artist', artistSchema);

module.exports = artist;
