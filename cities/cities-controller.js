const cityModel = require('./city-model');

module.exports = {
    getCities: async (req, res) => {
        const cities = await cityModel.find({});
        return res.status(200).json(cities);
    },

    addCity: async (req, res) => {
        const newCity= await cityModel.create(req.body);

        console.log(`City was created - ${newCity}`);
        return res.status(200).json(newCity);
    }
}
