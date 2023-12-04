const router = require('express').Router();
const RecommendationsController = require('./recommendations-controllers');

router.get('/', RecommendationsController.getRecommendations);

module.exports = router;
