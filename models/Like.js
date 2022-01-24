const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const likeModel = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    isUnlike: {
        type: Boolean,
        default: false
    },
    islike: {
        type: Boolean,
        default: false
    },
    wholiked: {
        type: ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})



const Like = mongoose.model('like', likeModel);
module.exports = Like;