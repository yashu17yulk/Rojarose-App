const Models = require('../../models/index');
const Utility = require('../../utility/Utility')
const messages = require('../../messages/messages')
const responseCode = require('../../utility/responseCode');
const mongoose = require('mongoose');

// *************CREATE LIKE************** //

async function createView(id, data) {
    console.log(data)
    const isExist = await Models.view.findOne({ whoViewed: id, userId: data.userId ,isViewed : true});
    if (isExist) {
        return ""
    }
    const qry = {
        whoViewed : id,
        isViewed : data.isViewed,
        userId : data.userId
    }
    const dataToSend = await Models.view.create(qry);
    return dataToSend;
};

// *************GET LIKES************** //

async function getViews(id) {
    const dataToSend = await Models.view.find({ userId: id });
    if (!dataToSend) {
        return
    }
    return dataToSend;
}

module.exports = {
    createView,
    getViews
}