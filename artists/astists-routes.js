const router = require('express').Router();
const ArtistsController = require('./artists-controller');

router.get('/', ArtistsController.getArtists);
router.post('/', ArtistsController.addArtist);

module.exports = router;
