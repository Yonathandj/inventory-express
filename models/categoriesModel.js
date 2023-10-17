const mongoose = require('mongoose');

const categoryModelSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true, minLength: 5 },
    description: { type: String, required: true, minLength: 100 },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
})

categoryModelSchema.virtual('detailUrl').get(function () {
    return `/catalog/categories/${this._id}`;
});

module.exports = mongoose.model('Category', categoryModelSchema);