const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const viewModel = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    isViewed: {
        type: Boolean,
        default: false
    },
    whoViewed: {
        type: ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})
const View = mongoose.model('view', viewModel);
module.exports = View;