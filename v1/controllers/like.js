const services = require('../services/index')
const Validations = require('../validators/index')
const responseCode = require('../../utility/responseCode')
const response = require('../../utility/response')
const APP_MESSAGES = require('../../language/eng')


// *************CREATE LIKE************** //
async function createLike(req, res, next) {
    try {
        await Validations.like.validateCreateLike(req);
        const data = await services.like.createLike( req);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
}

// *************CREATE LIKE************** //
async function getLikes(req, res, next) {
    try {
                const userId = req.user._id;
        const data = await services.like.getLikes(userId);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createLike,
    getLikes
}