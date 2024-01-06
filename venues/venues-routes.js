const router = require('express').Router();
const VenuesController = require('./venues-controller');
const {roleValidator} = require('../util/authorization-helper');

router.get('/', roleValidator(['admin']), VenuesController.getVenues);
router.post('/', roleValidator(['admin']), VenuesController.addVenue);

module.exports = router;
