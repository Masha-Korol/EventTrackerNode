const venueModel = require('./venues-model');
const cityModel = require('./../cities/city-model');

module.exports = {
    getVenues: async (req, res) => {
        const venuesResult = [];
        const venues = await venueModel.find({});

        for (const venue of venues) {
            const city = await cityModel.findById(venue.cityId);
            venuesResult.push({id: venue.id, venueName: venue.venueName, cityName: city.cityName});
        }

        return res.status(200).json(venuesResult);
    },

    addVenue: async (req, res) => {
        const createdVenue = await venue.create(req.body);
        console.log(`Venue was created - ${createdVenue}`);
        return res.status(200).json(createdVenue);
    }
}
