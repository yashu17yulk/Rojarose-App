const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const friendModel = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    friendId: {
        type: ObjectId,
        ref: 'user'
    },
    isFriend: {
        type: Boolean,
        default: false
    },
    isUnfriend: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isReport: {
        type: Boolean,
        default: false
    },
    friends: [{
        type: ObjectId,
        ref: 'user'
    }]
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const friend = mongoose.model('friend', friendModel);
module.exports = friend;