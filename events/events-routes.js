const router = require('express').Router();
const EventsController = require('./events-controller');

router.get('/', EventsController.getEvents);
router.get('/detailed', EventsController.getDetailedEvents);
router.get('/:id', EventsController.getEvent);
router.post('/', EventsController.createEvent);
router.post('/posters', EventsController.uploadEventPoster);
router.patch('/:id', EventsController.updateEvent);
router.delete('/:id', EventsController.deleteEvent);
router.get('/:id/state', EventsController.modifyEventState);
router.patch('/:id/mark', EventsController.modifyEventRank);

module.exports = router;
