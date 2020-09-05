import Joi from '@hapi/joi';

export default Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    gender: Joi.number().min(1).required()
})