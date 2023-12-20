module.exports = {
    getArtists: (req, res) => {
        // get from the db

        return res.status(200).json([
            {id: 1, artistName: 'Gorillaz'},
            {id: 2, artistName: 'My Chemical Romance'},
            {id: 3, artistName: 'Placebo'},
        ]);
    },

    addArtist: (req, res) => {
        const payload = req.body;
        const artistName = payload.artistName;
        const artistDescription = payload.artistDescription;

        // modify in the db

        console.log(`Artist was created - ${artistName}, ${artistDescription}`);
        return res.status(200).json();
    }
}
