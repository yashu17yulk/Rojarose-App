const services = require('../services/index')
const Validations = require('../validators/index')
const responseCode = require('../../utility/responseCode')
const response = require('../../utility/response')
const APP_MESSAGES = require('../../language/eng')


// *************CREATE VIEW************** //

async function createView(req, res, next) {
    try {
        const userId = req.user._id
        await Validations.view.validateCreateView(req);
        const data = await services.view.createView(userId, req.body);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
}

// *************CREATE VIEW************** //

async function getView(req, res, next) {
    try {
        const userId = req.user._id;
        const data = await services.view.getViews(userId);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createView,
    getView
}