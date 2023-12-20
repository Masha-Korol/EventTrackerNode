module.exports = {
    getCities: (req, res) => {
        // get from the db

        return res.status(200).json([
            {id: 1, cityName: 'Москва'},
            {id: 2, cityName: 'Санкт-Петербург'},
            {id: 3, cityName: 'Воронеж'},
            {id: 4, cityName: 'Калининград'},
            {id: 5, cityName: 'Вологда'},
        ]);
    },

    addCity: (req, res) => {
        const payload = req.body;
        const cityName = payload.cityName;

        // modify in the db

        console.log(`City was created - ${cityName}`);
        return res.status(200).json();
    }
}
