const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)
const { schema } = require('../../models/User');
const validateSchema = async (inputs, schema) => {
    try {
        const { error, value } = schema.validate(inputs);
        if (error) throw error.details ? error.details[0].message.replace(/['"]+/g, '') : "";
        else return false;
    } catch (error) { throw error; }
};
/*VALIDATE SIGNUP*/
const validateSignUp = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        userName: joi.string().required(),
        phone: joi.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        ).min(10).required(),
        password: joi.string().required().min(8),

    })
    return await validateSchema(req.body, schema)
}

/*VALIDATE SOCIAL LOGIN*/
const validateSocialLogin = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        email: joi.string().optional(),
        // phone: joi.string().optional(),
        firstName: joi.string().min(3).regex(/^[a-zA-Z ]+$/).optional(),
        lastName: joi.string().min(3).regex(/^[a-zA-Z ]+$/).optional(),
        countryCode: joi.string().optional(),
        socialId: joi.string().required(),
        isSocialLogin: joi.boolean().required(),
        socialType: joi.string().optional().valid("FACEBOOK", "GOOGLE", "APPLE"),
        deviceType: joi.string().optional().valid("ANDROID", "IOS", "WEB"),
        deviceToken: joi.string()
            .when('deviceType', { is: "ANDROID", then: joi.string().optional() })
            .concat(joi.string().when('deviceType', { is: "IOS", then: joi.string().optional() })
                .concat(joi.string().when('deviceType', { is: "WEB", then: joi.string().allow('', null).optional() })))
    })
    return await validateSchema(req.body, schema)
}
/*VALIDATE LOGIN*/
const validateLogin = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        phone: joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).min(10).required(),
        password: joi.string().required(),
    })
    return await validateSchema(req.body, schema)
}

const validateVerifyOtp = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        phone: joi.string().regex(/^[0-9]+$/).min(10).required(),
        code: joi.number().required()
    })
    return await validateSchema(req.body, schema)
}
/*VALIDATE RESET PASSWORD*/

const validateResetPassword = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        phone: joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).min(10).required(),
        newPassword: joi.string().optional().min(8),
    })
    return await validateSchema(req.body, schema)
}
/*VALIDATE UPDATE PROFILE*/
const validateUpdateProfile = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        phone: joi.string().regex(/^[0-9]+$/).min(10).optional(),
        firstName: joi.string().optional(),
        lastName: joi.string().optional(),
        userName: joi.string().optional(),
        middleName: joi.string().optional(),
        dob: joi.string().optional(),
        age: joi.number().optional(),
        work: joi.string().optional(),
        email: joi.string().optional(),
        userLocation: joi.object({
            type : joi.string().optional(),
            coordinates: joi.array().optional()
        }).optional(),
        latitude: joi.number().optional(),
        longitude: joi.number().optional(),
        gender: joi.string().optional(),
        sexuality: joi.string().optional(),
        height: joi.string().optional(),
        bodyType: joi.string().optional(),
        ethnicity: joi.array().optional(),
        religion: joi.string().optional(),
        isFirstResponder: joi.boolean().optional(),
        salary: joi.number().optional(),
        education: joi.string().optional(),
        longestRelationship: joi.string().optional(),
        activities: joi.array().optional(),
        musicGenres: joi.array().optional(),
        targetPerson: joi.string().optional(),
        bio: joi.string().optional(),
        password: joi.string().optional().min(8),
        location: joi.object().optional(),
        fcmToken: joi.string().optional()
    })
    return await validateSchema(req.body, schema)
}

/*VALIDATE_UN_FRIEND_USER*/
const validateUnFriendUser = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        isUnfriend: joi.boolean().required(),
        isFriend: joi.boolean().optional(),
        friendId: joi.string().min(24).max(24)
    })
    return await validateSchema(req.body, schema)
}

/*VALIDATE UPDATE PROFILE*/
const validateSendRequest = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        receiverId: joi.string().min(24).max(24),
        isRequestSent: joi.boolean().optional(),
        isRequestRemoved: joi.boolean().optional()
    })
    return await validateSchema(req.body, schema)
}

module.exports = {
    validateSignUp,
    validateSocialLogin,
    validateLogin,
    validateVerifyOtp,
    validateResetPassword,
    validateUpdateProfile,
    validateSendRequest,
    validateUnFriendUser
}