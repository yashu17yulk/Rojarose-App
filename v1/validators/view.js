const joi = require('joi');

const validateSchema = async (inputs, schema) => {
    try {
        const { error, value } = schema.validate(inputs);
        if (error) throw error.details ? error.details[0].message.replace(/['"]+/g, '') : "";
        else return false;
    } catch (error) { throw error; }
};

// *************VALIDATE CREATE VIEW************** //

const validateCreateView = async (req, property = 'body') => {
    let schema = {};
    schema = joi.object().keys({
     userId: joi.string().length(24).required(), 
     isViewed: joi.boolean().required(),
    //  whoViewed: joi.string().length(24).required()
   })
    return await validateSchema(req.body, schema)
};


module.exports = {
    validateCreateView
}