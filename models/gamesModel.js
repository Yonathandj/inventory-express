const mongoose = require('mongoose');

const gameModelSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true, minLength: 3 },
    description: { type: String, required: true, minLength: 100 },
    price: { type: Number, required: true },
    categories: [{ type: mongoose.Schema.Types.String, ref: 'Category' }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
})

gameModelSchema.virtual('detailUrl').get(function () {
    return `/catalog/games/${this._id}`
})

module.exports = mongoose.model('Game', gameModelSchema);