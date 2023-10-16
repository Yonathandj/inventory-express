const Joi = require('joi');

const invariantError = require('../error/invariantError');

const categoryValidatorSchema = Joi.object({
    name: Joi.string().min(5).alphanum().required(),
    description: Joi.string().min(100).required(),
})

const categoryValidator = (req) => {
    const { value, error } = categoryValidatorSchema.validate(req.body);
    if (error) {
        throw new invariantError(`${error.message}`, 400);
    }
}

module.exports = categoryValidator