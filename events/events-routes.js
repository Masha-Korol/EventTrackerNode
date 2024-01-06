const router = require('express').Router();
const EventsController = require('./events-controller');
const {roleValidator} = require('../util/authorization-helper');

router.get('/', EventsController.getEvents);
router.get('/detailed', EventsController.getDetailedEvents);
router.get('/:id', EventsController.getEvent);
router.post('/', roleValidator(['admin']), EventsController.createEvent);
router.post('/posters', roleValidator(['admin']), EventsController.uploadEventPoster);
router.patch('/:id', roleValidator(['admin']), EventsController.updateEvent);
router.delete('/:id', roleValidator(['admin']), EventsController.deleteEvent);
router.get('/:id/state', EventsController.modifyEventState);
router.patch('/:id/mark', EventsController.modifyEventRank);

module.exports = router;
