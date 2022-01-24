const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const notificationModel = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    likeId: {
        type: ObjectId,
        ref: 'like'
    },
    viewId: {
        type: ObjectId,
        ref: 'view'
    },
    receiverId: {
        type: ObjectId,
        ref: 'user'
    },
    notificationType: {
        type: String
    },
    title: {
        type: String,
        default: ''
    },
    body: {
        type: String,
        default: ''
    },
    isRead: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})



const notification = mongoose.model('notification', notificationModel);
module.exports = notification;