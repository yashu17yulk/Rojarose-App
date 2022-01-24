const services = require('../services/index')
const Validations = require('../validators/index')
const responseCode = require('../../utility/responseCode')
const response = require('../../utility/response')
const APP_MESSAGES = require('../../language/eng')


// *************CREATE THEME************** //
async function createTheme(req,res,next){
    try {
        const userId = req.user._id;
        const data = await services.theme.createTheme(userId, req.body);
        return response.sendSuccessResponse(req, res, data, responseCode.OK)
    } catch (error) {
        next(error)
    }
};

module.exports = {
    createTheme
}