const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true},
        events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {id: true}
).set('toJSON', {virtuals: true});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
