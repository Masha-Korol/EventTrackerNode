const router = require('express').Router();
const CommentsController = require('./comments-controller');

router.post('/', CommentsController.addComment);
router.delete('/:id', CommentsController.deleteComment);

module.exports = router;
