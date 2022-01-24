const Validations = require('../validators/index')
const responseCode = require('../../utility/responseCode')
const response = require('../../utility/response')
const APP_MESSAGES = require('../../language/eng')
const services = require('../services')
const { user } = require('../../models')

async function getchats(req, res, next) {
    try {
        const id = req.user._id;
        const data = await services.chat.getchats(id)
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
};

async function createChat(req, res, next) {
    try {
        const userId = req.user._id
        const data = await services.chat.createChat(userId, req.body);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
}

async function searchChats(req, res, next) {
    try {
        const userId = req.user._id
        const data = await services.chat.searchChats(userId, req.query.userName)
        return response.sendSuccessResponse(req, res, data, responseCode.OK);
    } catch (error) {
        next(error)
    }
}

async function deleteChat(req, res, next) {
    try {
        const userId = req.user._id
        const data = await services.chat.deleteChat(userId, req.params.id);
        return response.sendSuccessResponse(req, res, data, responseCode.OK);
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getchats,
    createChat,
    searchChats,
    deleteChat
}