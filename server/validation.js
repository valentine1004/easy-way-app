const Joi = require('@hapi/joi');
// register validation
const registerValidation = data => {
    const schema = {
        name: Joi.string().min(2).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required(),
        phone: Joi.string(),
        location: Joi.string(),
        area: Joi.string(),
        role: Joi.string(),
        description: Joi.string(),
        schedule: Joi.object(),
        doctorId: Joi.string()
    };

    return Joi.validate(data, schema);
};
// login validation
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };

    return Joi.validate(data, schema);
};
// request validation
const requestValidation = (data) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        date: Joi.string().required(),
        priority: Joi.string().required(),
        patientId: Joi.string().required(),
        area: Joi.string().required(),
        doctorId: Joi.string().required(),
        evaluation: Joi.string(),
        comment: Joi.string()
    }
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.requestValidation = requestValidation;
