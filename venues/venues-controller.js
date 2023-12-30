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
        const createdVenue = await venueModel.create(req.body);
        console.log(`Venue was created - ${createdVenue}`);

        const venue = await venueModel.findById(createdVenue.id)
            .populate('cityId');
        const venueResult = {id: venue.id, venueName: venue.venueName, cityName: venue.cityId.cityName};
        return res.status(200).json(venueResult);
    }
}
