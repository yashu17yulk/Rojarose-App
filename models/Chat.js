const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const chatModel = new Schema({
    senderId: {
        type: ObjectId,
        ref: 'user'
    },
    receiverId: {
        type: ObjectId,
        ref: 'user'
    },
    isReaded: {
        type: Boolean,
        default: false
    },
    chatType: {
        type: [String],
        enum: ['TEXT', 'IMAGE', 'DOC']
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    message:[{
        type: String,
        isReaded: {
            type: Boolean,
            default: false
        }
    }]
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
)
const Chat = mongoose.model('chat', chatModel);
module.exports = Chat;
