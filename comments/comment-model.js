const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true }
}).set('toJSON', {
    virtuals: true
});

const comment = mongoose.model('comment', commentSchema);

module.exports = {comment, commentSchema};
