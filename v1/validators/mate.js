const joi = require('joi');

const validateSchema = async (inputs, schema) => {
    try {
        const { error, value } = schema.validate(inputs);
        if (error) throw error.details ? error.details[0].message.replace(/['"]+/g, '') : "";
        else return false;
    } catch (error) { throw error; }
};

// *************VALIDATE CREATE MATE************** //
const validateCreateMate = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        age: joi.number().required(),
        gender : joi.string().optional(),
        eyeColor: joi.string().required(),
        hairColor: joi.string().required(),
        skinColor: joi.string().required(),
        education: joi.string().required(),
        salary: joi.number().required(),
        work: joi.string().required(),
        ethnicity: joi.array().required(),
        maritalStatus: joi.string().required(),
        activities: joi.number().required(),
        musicGenres: joi.number().required(),
        distance: joi.number().required(),
        userId: joi.string().optional(),
        bodyType: joi.string().required(),
        firstResponder:joi.string().required()
    })
    return await validateSchema(req.body, schema)
};

// *************VALIDATE UPDATE MATE************** //
const validateUpdateMate = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
        age: joi.number().optional(),
        eyeColor: joi.string().optional(),
        hairColor: joi.string().optional(),
        skinColor: joi.string().optional(),
        education: joi.string().optional(),
        salary: joi.number().optional(),
        work: joi.string().optional(),
        ethnicity: joi.string().optional(),
        maritalStatus: joi.string().optional(),
        activities: joi.number().optional(),
        musicGenres: joi.number().optional(),
        distance: joi.number().optional(),
        userId: joi.string().optional(),
        bodyType: joi.string().optional(),
        firstResponder:joi.string().optional(),
        isDeleted:joi.boolean().optional()
    })
    return await validateSchema(req.body, schema)
};


module.exports = {
    validateCreateMate,
    validateUpdateMate
}