const {commentModel} = require('./comment-model');
const {eventModel} = require('../events/event-model');

module.exports = {
    addComment: async (req, res) => {
        let newComment = req.body;
        //TODO get user from auth context
        newComment.userName = req.currentUserName;
        newComment.date = new Date();

        newComment = await commentModel.create(newComment);

        await eventModel.findByIdAndUpdate(newComment.eventId,
            {$push: {comments: newComment._id}},
            {new: true, useFindAndModify: false});

        const createdComment = {id: newComment.id, userName: newComment.userName, text: newComment.text, date: newComment.date.toLocaleDateString()};

        console.log(`Comment was created ${createdComment}`);
        return res.status(200).json(createdComment);
    },

    deleteComment: (req, res) => {
        const commentId = req.params.id;

        commentModel.findByIdAndDelete(commentId);

        console.log(`Comment ${commentId} was deleted`);
        return res.status(200);
    },
}
