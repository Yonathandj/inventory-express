const Joi = require('joi');

const invariantError = require('../errors/notFoundError');

const gameValidatorSchema = Joi.object({
    mimeType: Joi.string().valid("image/apng", "image/avif", "image/gif", "image/jpeg", "image/png", "image/webp", "image/svg+xml").required(),
    name: Joi.string().min(3).trim().required(),
    description: Joi.string().min(100).trim().required(),
    price: Joi.number().required(),
    categories: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).required(),
})

const gameValidator = ({ mimeType, name, description, price, categories }) => {
    const { value, error } = gameValidatorSchema.validate({ mimeType, name, description, price, categories });
    if (error) {
        throw new invariantError(error.message, 400);
    }
}

module.exports = gameValidator;
