const responseCode = require('./responseCode');
const appMessages  = require('../language/index');
const constant     = require('./constant')        

                /******************************************************************************
                **********************************sendSuccessResponse*****************************
                *******************************************************************************/ 
function sendSuccessResponse(req, res, data, httpCode = responseCode.OK, message){
    if(!data && message){
        data = {
            message: getMessage(req, message)
        }
    }else if(data && message){
        data.message = getMessage(req, message)
    }
    let responseData = {};
    let headers = {};
    data = data || {}
    responseData.data = data;
    if(data.pagination){
        responseData.data = data.data;
        responseData.total = data.count;
        responseData.pageCount = Math.ceil(data.count / data.limit);
        headers["x-total"] = data.count;
        headers["x-total-pages"] = Math.ceil(data.count / data.limit);
    }
    responseData.statusCode = httpCode;
    responseData.message= data.message || "";
        
    res.status(httpCode).set(headers).send(responseData);

}
                /******************************************************************************
                **********************************sendFailResponse*****************************
                *******************************************************************************/ 
function sendFailResponse(req, res, httpCode = responseCode.BAD_REQUEST, message, data) {
    if (!data && message) {
        data = {
            statusCode : httpCode,
            message: getMessage(req, message)
        }
    }else if(data && message){
        data.message = getMessage(req, message)
    }
    if(data){
        data.data = {}
    }
    data.statusCode = httpCode
    res.status(httpCode).send(data);
}



function getMessage(req, message) {
    const lang =
        req.headers["content-language"] || constant.LANGUAGE_TYPE.ENGLISH;
    return appMessages[lang]["APP_MESSAGES"][message] || message;
}

module.exports = {
    sendSuccessResponse,
    sendFailResponse,
    getMessage
}