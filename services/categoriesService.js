const { nanoid } = require("nanoid");

const categoryModel = require("../models/categoriesModel");
const gameModel = require('../models/gamesModel');

const invariantError = require("../errors/invariantError");
const notFoundError = require('../errors/notFoundError');

async function getCategoriesData() {
    const categories = await categoryModel.find({}, { name: 1, description: 1 }).exec();
    if (categories.length === 0) {
        throw new notFoundError("Category list not exist yet. Let's add some new category", 404);
    }
    return categories;
}

async function postCategory({ name, description }) {
    const existingCategory = await categoryModel.findOne({ name }).exec();
    if (existingCategory !== null) {
        throw new invariantError("The category you trying to add is exist", 400)
    }

    const _id = `category-${nanoid(16)}`;
    const createdAt = new Date();
    const updatedAt = createdAt;

    const newCategory = new categoryModel({
        _id,
        name,
        description,
        createdAt,
        updatedAt
    })
    return await newCategory.save();
}

async function getCategoryDetailData(_id) {
    const gamesRelatedToCategory = await gameModel.find({ categories: _id }, { name: 1, description: 1 }).exec();

    const categoryDetail = await categoryModel.findOne({ _id });
    return { gamesRelatedToCategory, categoryDetail };
}


async function deleteCategoryById(_id) {
    const gamesRelatedToCategory = await gameModel.find({ categories: _id }).exec();
    if (gamesRelatedToCategory.length > 0) {
        throw new invariantError('There are games related to this category. You can delete those games first', 400);
    }
    await categoryModel.deleteOne({ _id }).exec();

}

async function getCategoryById(_id) {
    const category = await categoryModel.findOne({ _id }, { name: 1, description: 1 }).exec();
    return category;
}

async function updateCategory({ _id, name, description }) {
    await categoryModel.updateOne({ _id }, { name, description }).exec();
}

module.exports = {
    postCategory,
    getCategoriesData,
    getCategoryDetailData,
    deleteCategoryById,
    getCategoryById,
    updateCategory
}