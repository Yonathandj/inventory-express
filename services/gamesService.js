const { nanoid } = require('nanoid');

const gameModel = require('../models/gamesModel');

const notFoundError = require("../errors/notFoundError");
const invariantError = require("../errors/invariantError");

async function getGamesData() {
    const games = await gameModel.find({}, { name: 1, description: 1 }).exec();
    if (games.length === 0) {
        throw new notFoundError("Games list not exist yet. Let's add some new game", 404);
    }
    return games;
}

async function postGame({ filename, name, description, price, categories }) {
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
        filenameImage: filename
    })
    return await newGame.save()
}

async function getGameById(_id) {
    const game = await gameModel.findOne({ _id }).populate('categories').exec();
    if (game === null) {
        throw new notFoundError('game you search not found', 404);
    }
    return game;
}

async function deleteGameById(_id) {
    await gameModel.deleteOne({ _id }).exec();
}

async function updateGameById({ filename, _id, name, description, price, categories }) {
    const updatedAt = new Date();
    await gameModel.updateOne({ _id }, {
        name, description, price, categories, updatedAt, filenameImage: filename
    }).exec();
}

async function getGamesRelatedCategory(_id) {
    const games = await gameModel.find({ categories: _id }, { name: 1, description: 1 }).exec();
    return games;
}



module.exports = {
    getGamesData,
    postGame,
    getGameById,
    deleteGameById,
    updateGameById,
    getGamesRelatedCategory,
}