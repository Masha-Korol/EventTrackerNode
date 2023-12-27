const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
    userName: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true }},
    { id: true }
).set('toJSON', {virtuals: true});

const comment = mongoose.model('comment', commentSchema);

module.exports = {commentModel: comment, commentSchema};
