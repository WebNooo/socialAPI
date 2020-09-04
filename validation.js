const Joi = require('@hapi/joi');

const registerUserValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required()
})

const loginUserValidation = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
})

module.exports = {registerUserValidation, loginUserValidation}
