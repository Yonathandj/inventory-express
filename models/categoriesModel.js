const mongoose = require('mongoose');

const { DateTime } = require('luxon');

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

categoryModelSchema.virtual('createdFormatted').get(function () {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});
categoryModelSchema.virtual('updatedFormatted').get(function () {
    return DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Category', categoryModelSchema);