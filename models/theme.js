const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId  = mongoose.Types.ObjectId;
const themeModel = new Schema({
    theme: {
        type: String,
        enum : ["ROSA ROSE", "ST. VALENTINE'S DAY", "CHRISTMAS", "HALLOWEEN"]
    },
    borderSize: {
        type: Number
    },
    curveTop: {
        type: Number
    },
    curveButton: {
        type: Number
    },
    userId : {
        type : ObjectId,
        ref : 'user'
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const theme = mongoose.model('theme', themeModel);
module.exports = theme;