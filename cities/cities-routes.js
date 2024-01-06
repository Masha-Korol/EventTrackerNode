const router = require('express').Router();
const CitiesController = require('./cities-controller');
const {roleValidator} = require('../util/authorization-helper');

router.get('/', roleValidator(['admin']), CitiesController.getCities);
router.post('/', roleValidator(['admin']), CitiesController.addCity)

module.exports = router;
