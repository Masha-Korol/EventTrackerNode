module.exports = {
    getVenues: (req, res) => {
        // get from the db

        return res.status(200).json([
            {id: 1, venueName: 'Event Hall', cityName: 'Воронеж'},
            {id: 2, venueName: 'Арена Открытие', cityName: 'Москва'},
            {id: 3, venueName: 'Лужники', cityName: 'Москва'},
        ]);
    },

    addVenue: (req, res) => {
        const payload = req.body;
        const venueName = payload.venueName;
        const cityId = payload.cityId;

        // modify in the db

        console.log(`Venue was created - ${venueName}, ${cityId}`);
        return res.status(200).json();
    }
}
