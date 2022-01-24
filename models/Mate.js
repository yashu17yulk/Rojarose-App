const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const mateModel = new Schema({
    age: {
        type: Number
    },
    bodyType: {
        type: String,
        enum: ["THIN", "AVERAGE", "PETIT", "MUSCULAR", "ATHLETIC", "AFEWEXTRAPOUNDS"]
    },
    eyeColor: {
        type: String,
        default: ""
    },
    hairColor: {
        type: String,
        default: ""
    },
    skinColor: {
        type: String,
        default: ""
    },
    education: {
        type: String,
        default: ""
    },
    salary: {
        type: Number
    },
    work: {
        type: String,
        default: ""
    },
    firstResponder: {
        type: String,
        enum: ["YES", "NO"]
    },
    ethnicity: [{
        type: String
    }],
    maritalStatus: {
        type: String,
        default: ""
    },
    // longestRelationship: {
    //     type
    // },
    activities: [{
        type: Number,
    }],
    musicGenres: [{
        type: Number
    }],
    distance: {
        type: Number
    },
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ["MAN", "WOMAN", "TRANSGENDER"]
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
)
const Mate = mongoose.model('mate', mateModel);
module.exports = Mate;
