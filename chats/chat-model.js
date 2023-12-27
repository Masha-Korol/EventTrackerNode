const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true },
    isCurrentUserAuthor: { type: Boolean, required: true },
}).set('toJSON', {
    virtuals: true
});

const chatSchema = new mongoose.Schema({
    messages: [messageSchema],
}).set('toJSON', {
    virtuals: true
});

const chat = mongoose.model('chat', chatSchema);
const message = mongoose.model('message', messageSchema);


module.exports = chat;