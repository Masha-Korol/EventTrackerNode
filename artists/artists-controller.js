const artistModel = require('./artist-model');

module.exports = {
    getArtists: async (req, res) => {
        const artists = await artistModel.find({});
        return res.status(200).json(artists);
    },

    addArtist: async (req, res) => {
        console.log(`Creating new artist: ${req.body}`);
        const newArtist = await artistModel.create(req.body);

        console.log(`Artist was created: ${newArtist}`);
        return res.status(200).json(newArtist);
    }
}
