const Models = require('../../models/index');
const Utility = require('../../utility/Utility')
const messages = require('../../messages/messages')
const responseCode = require('../../utility/responseCode');
const mongoose = require('mongoose');

// *************    CREATE MATE  ************** //
async function createMate(id, data) {
    const isExist = await Models.mate.find({ userId: id });
    if (isExist.length > 0) {
        throw messages.MESSAGES.MATE_ALREADY_EXISTS
    }
    const qry = {
        userId : id,
        age : data.age,
        bodyType : data.bodyType,
        eyeColor : data.eyeColor,
        hairColor : data.hairColor,
        skinColor :data.skinColor,
        education : data.education,
        salary : data.salary,
        work : data.work,
        firstResponder : data.firstResponder,
        ethnicity : data.ethnicity,
        maritalStatus : data.maritalStatus,
        activities : data.activities,
        musicGenres : data.musicGenres,
        distance : data.distance,
    }
    const dataToSend = await Models.mate.create(qry);
    return dataToSend;
};

// *************    EDIT MATE     ************** //
async function updateMate(id, data) {
    const qry = {
        userId : id,
        age : data.age,
        bodyType : data.bodyType,
        eyeColor : data.eyeColor,
        hairColor : data.hairColor,
        skinColor :data.skinColor,
        education : data.education,
        salary : data.salary,
        work : data.work,
        firstResponder : data.firstResponder,
        ethnicity : data.ethnicity,
        maritalStatus : data.maritalStatus,
        activities : data.activities,
        musicGenres : data.musicGenres,
        distance : data.distance,
    }
    const dataToSend = await Models.mate.findOneAndUpdate({
        userId: id,
        isDeleted: false
    },
        qry,
        { new: true });
    return dataToSend;
}

// *************    GET MATE BY ID     ************** //
async function getMateById(id) {
    const dataToSend = await Models.mate.find({ userId: id, isDeleted: false });
    if (dataToSend)
        return dataToSend;
}

// *************     DELETE MATE     ************** //
async function deleteMate(id) {
    const dataToSend = await Models.mate.findOneAndUpdate({ userId: id }, { isDeleted: true }, { new: true });
    return dataToSend;
}

// *************     SEARCH MATES     ************** //
async function searchMates(data) {
    const qry = {
        userName: {
            $regex: '.*' + data.userName + '.*'
        }
    }
    const projection = {
        userName: 1,
        age: 1,
        ethnicity: 1,
        work: 1,
        isPhoneVerify: 1
    };
    const dataToSend = await Models.user.find(qry, projection)
    if (!data) {
        throw messages.MESSAGES.NO_SUCH_USER
    }
    return dataToSend
}
module.exports = {
    createMate,
    updateMate,
    deleteMate,
    getMateById,
    searchMates
}
