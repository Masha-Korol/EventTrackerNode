const router = require('express').Router();
const CitiesController = require('./cities-controller');

router.get('/', CitiesController.getCities);
router.post('/', CitiesController.addCity)

module.exports = router;
