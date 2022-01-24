const services = require('../services/index')
const Validations = require('../validators/index')
const responseCode = require('../../utility/responseCode')
const response = require('../../utility/response')
const APP_MESSAGES = require('../../language/eng')


// *************CREATE MATE************** //
async function createMate(req, res, next) {
  
    try {
        await Validations.mate.validateCreateMate(req);
        const userId = req.user._id
        console.log(userId);
        const data = await services.mate.createMate(userId, req.body);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
};

// *************EDIT MATE************** //
async function updateMate(req, res, next) {
    try {
        await Validations.mate.validateUpdateMate(req);
        const userId = req.user._id
        const data = await services.mate.updateMate(userId, req.body);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
};

// *************GET MATE BY ID************** //
async function getMateById(req, res, next) {
    try {
        const userId = req.user._id
        const data = await services.mate.getMateById(userId);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
};

// *************DELETE MATE************** //
async function deleteMate(req, res, next) {
    try {
        const userId = req.user._id
        const data = await services.mate.deleteMate(userId);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
}

// *************SEARCH MATE************** //
async function searchMates(req,res,next){
    try {
        const userId = req.user._id;
        const data = await services.mate.searchMates(userId, req.query);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createMate,
    updateMate,
    deleteMate,
    getMateById,
    searchMates
}