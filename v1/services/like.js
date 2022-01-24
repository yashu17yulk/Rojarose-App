const Models = require('../../models/index');
const Utility = require('../../utility/Utility')
const messages = require('../../messages/messages')
const responseCode = require('../../utility/responseCode');
const mongoose = require('mongoose');

// *************CREATE LIKE************** //
async function createLike(data) {
    const isExist = await Models.like.findOne({
        whoLiked: data.user._id,
        userId: data.body.userId,
        islike: true
    });
    if (isExist) {
        return 
    }
    const qry = {
        wholiked: data.user._id,
        islike: data.body.islike,
        isUnlike: data.body.isUnlike,
        userId: data.body.userId
    }
    const dataToSend = await Models.like.create(qry);
    return dataToSend;
};

// *************GET LIKES************** //
async function getLikes(id) {
    const qry = {
        userId: id,
        islike: true
    }
    const dataToSend = await Models.like.find(qry);
    if (!dataToSend) {
        return ""
    }
    return dataToSend;
}

module.exports = {
    createLike,
    getLikes
}