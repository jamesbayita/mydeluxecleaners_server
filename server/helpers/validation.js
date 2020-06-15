import Joi from '@hapi/joi';

const validateUser = Joi.object({
    first_name: Joi.string()
        .min(1)
        .max(20)
        .trim()
        .uppercase()
        .required(),
    last_name: Joi.string()
        .min(1)
        .max(20)
        .trim()
        .uppercase()
        .required(),
    email: Joi.string()
        .email()
        .trim()
        .required()
}).options({abortEarly: false});

export default validateUser;