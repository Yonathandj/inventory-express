const { nanoid } = require("nanoid");

const categoryModel = require("../models/categoriesModel");

const invariantError = require("../errors/invariantError");
const notFoundError = require('../errors/notFoundError');

async function getCategoriesData() {
    const games = await categoryModel.find({}, { name: 1, description: 1 }).exec();
    if (games.length === 0) {
        throw new notFoundError("Category list not exist yet. Let's add some new category", 404);
    }
    return games;
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

module.exports = {
    postCategory,
    getCategoriesData
}