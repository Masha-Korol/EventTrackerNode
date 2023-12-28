const mongoose = require('mongoose');

const citySchema = mongoose.Schema(
    {
        cityName: {type: String, required: true}
    },
    {id: true}
).set('toJSON', {virtuals: true});

const cityModel = mongoose.model('city', citySchema);

module.exports = cityModel;
