const {commentModel} = require('./comment-model');

module.exports = {
    addComment: async (req, res) => {
        let newComment = req.body;
        //TODO get user from auth context
        newComment.userName = 'marikoroleva';
        newComment.date = '12/12/2023';

        newComment = await commentModel.create(newComment);

        console.log(`Comment was created ${newComment}`);
        return res.status(200).json(newComment);
    },

    deleteComment: (req, res) => {
        const commentId = req.params.id;

        commentModel.findByIdAndDelete(commentId);

        console.log(`Comment ${commentId} was deleted`);
        return res.status(200);
    },
}
