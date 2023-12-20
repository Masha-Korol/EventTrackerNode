const router = require('express').Router();
const VenuesController = require('./venues-controller');

router.get('/', VenuesController.getVenues);
router.post('/', VenuesController.addVenue);

module.exports = router;
