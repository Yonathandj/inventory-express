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

async function getGameById(_id) {
    const game = await gameModel.findOne({ _id }).populate('categories').exec();
    console.log(game);
    return game;
}

module.exports = {
    getGamesData,
    postGame,
    getGamesRelatedCategory,
    getGameById
}