const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const requestModel = new Schema({
    senderId: {
        type: ObjectId,
        ref: 'user'
    },
    receiverId: {
        type: ObjectId,
        ref: 'user'
    },
    isRequestSent: {
        type: Boolean,
        default: false
    },
    isRequestRemoved: {
        type: Boolean,
        default: false
    },
    isRequestAccepted: {
        type: Boolean,
        default: false
    },
    isRequestDeleted: {
        type: Boolean,
        default: false
    },
    isRequestReceived: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const request = mongoose.model('request', requestModel);
module.exports = request;