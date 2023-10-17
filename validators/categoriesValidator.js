const Joi = require('joi');

const invariantError = require('../errors/invariantError');

const categoryValidatorSchema = Joi.object({
    name: Joi.string().min(5).required(),
    description: Joi.string().min(100).required(),
})

const categoryValidator = ({ name, description }) => {
    const { value, error } = categoryValidatorSchema.validate({ name, description });
    if (error) {
        throw new invariantError(error.message, 400);
    }
}

module.exports = categoryValidator