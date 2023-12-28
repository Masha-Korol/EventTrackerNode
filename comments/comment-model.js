const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true},
        text: {type: String, required: true},
        date: {type: Date, required: true},
        eventId: {type: String, required: true}
    },
    {id: true}
).set('toJSON', {virtuals: true});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = {commentModel, commentSchema};
