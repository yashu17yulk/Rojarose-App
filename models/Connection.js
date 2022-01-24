const { ref } = require('joi');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const connectionModel = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    recieverId: {
        type: ObjectId,
        ref: 'user'
    },
    isMatch: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })
const connection = mongoose.model('connection', connectionModel);
module.exports = connection
