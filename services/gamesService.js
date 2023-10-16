const categoryModel = require('../models/categoriesModel');

const notFoundError = require("../errors/notFoundError");

async function getGameFormData() {
    const categoriesList = await categoryModel.find({}, { name: 1 });
    if (categoriesList === null) {
        throw new notFoundError('Categories list did not exist yet. Add new category first', 404)
    }
    return categoriesList;
}

module.exports = {
    getGameFormData
}