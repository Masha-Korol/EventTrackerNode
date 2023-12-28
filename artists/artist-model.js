const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
    {
        artistName: {type: String, required: true},
        artistDescription: {type: String, required: false},
    },
    {id: true}
).set('toJSON', {virtuals: true});


const artistModel = mongoose.model('artist', artistSchema);

module.exports = artistModel;
