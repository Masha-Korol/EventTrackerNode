const router = require('express').Router();
const ArtistsController = require('./artists-controller');
const {roleValidator} = require("../util/authorization-helper");

router.get('/', roleValidator(['admin']), ArtistsController.getArtists);
router.post('/', roleValidator(['admin']), ArtistsController.addArtist);

module.exports = router;
