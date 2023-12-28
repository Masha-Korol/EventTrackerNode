const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        authorUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {type: String, required: true},
        date: {type: Date, required: true}
    },
    {id: true}
).set('toJSON', {virtuals: true});

const chatSchema = new mongoose.Schema(
    {
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
        lastMessageText: {type: String, required: false},
        messages: [messageSchema]
    },
    { id: true }
).set('toJSON', {virtuals: true});

const chatModel = mongoose.model('chat', chatSchema);
const messageModel = mongoose.model('message', messageSchema);


module.exports = {chatModel, messageModel};
