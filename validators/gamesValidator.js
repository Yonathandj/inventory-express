const Joi = require('joi');

const invariantError = require('../errors/notFoundError');

const gameValidatorSchema = Joi.object({
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/apng', 'image/avif').required(),
    name: Joi.string().min(3).trim().required(),
    description: Joi.string().min(100).trim().required(),
    price: Joi.number().required(),
    categories: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).required(),
})

const gameValidator = ({ mimetype, name, description, price, categories }) => {
    const { value, error } = gameValidatorSchema.validate({ mimetype, name, description, price, categories });
    if (error) {
        throw new invariantError(error.message, 400);
    }
}

module.exports = gameValidator;
