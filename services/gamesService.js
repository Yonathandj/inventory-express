const { nanoid } = require('nanoid');

const categoryModel = require('../models/categoriesModel');
const gameModel = require('../models/gamesModel');

const notFoundError = require("../errors/notFoundError");
const invariantError = require("../errors/invariantError");

async function getGameFormDataCategories() {
    const categoriesList = await categoryModel.find({}, { name: 1 });
    if (categoriesList.length === 0) {
        throw new notFoundError('Categories list not exist yet. Add new category first', 404)
    }
    return categoriesList;
}

async function postGame({ name, description, price, categories }) {
    const existingGame = await gameModel.findOne({ name }).exec();
    if (existingGame !== null) {
        throw new invariantError('Game already exist', 400);
    }
    const _id = `game-${nanoid(16)}`;
    const createdAt = new Date();
    const updatedAt = createdAt;

    const newGame = new gameModel({
        _id,
        name,
        description,
        price,
        categories,
        createdAt,
        updatedAt,
    })

    return await newGame.save()
}

async function getGamesRelatedCategory(_id) {
    const games = await gameModel.find({ categories: _id }, { name: 1, description: 1 }).exec();
    return games;
}

module.exports = {
    getGameFormDataCategories,
    postGame,
    getGamesRelatedCategory
}