const gameValidator = require("../validators/gamesValidator");
const { postGame, getGamesData, getGameById, deleteGameById, updateGameById } = require("../services/gamesService");
const { getCategoriesData } = require("../services/categoriesService");
const removeValidationErrorImage = require("../lib/removeValidationErrorImage");

async function getGamesIndexPage(req, res) {
    try {
        const games = await getGamesData();
        res.render("gamesIndexPage", { games });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.render("gamesIndexPage", { error: error.message });
        }
    }
}

async function getGameForm(req, res) {
    try {
        const categories = await getCategoriesData();
        res.render('gameForm', { categories });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.render("gameForm", { error: error.message })
        }
    }
}

async function postGameForm(req, res) {
    try {
        const { mimetype, filename } = req.file
        gameValidator({ mimetype, ...req.body });
        await postGame({ filename, ...req.body });
        res.redirect('/catalog/games')
    } catch (error) {
        if (error.statusCode === 400) {
            try {
                const categoriesList = await getCategoriesData();
                if (req.body.categories) {
                    for (category of categoriesList) {
                        if (req.body.categories.includes(category._id)) {
                            category.checked = "true"
                        }
                    }
                }
                removeValidationErrorImage(req.file.filename)
                return res.render('gameForm', { game: req.body, error: error.message, categories: categoriesList });
            } catch (error) {
                if (error.statusCode === 404) {
                    return res.render("gameForm", { error: error.message, game: req.body })
                }
            }
        }
    }
}

async function getGamesDetailPage(req, res) {
    try {
        const game = await getGameById(req.params.id);
        res.render('gameDetailPage', { game })
    } catch (error) {
        if (error.statusCode === 404) {
            res.redirect('/catalog/games');
        }
    }
}

async function deleteGame(req, res) {
    try {
        await deleteGameById(req.params.id);
        res.redirect('/catalog/games');
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getUpdateForm(req, res) {
    try {
        const game = await getGameById(req.params.id);
        const mappedGameToGetId = game.categories.map((g => g._id));
        const categoriesList = await getCategoriesData();
        for (category of categoriesList) {
            if (mappedGameToGetId.includes(category._id)) {
                category.checked = true
            }
        }
        return res.render('gameForm', { game, categories: categoriesList });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.render("gameForm", { error: error.message, game })
        }
    }
}

async function postUpdateForm(req, res) {
    try {
        const _id = req.params.id;
        const { mimetype, filename } = req.file
        gameValidator({ mimetype, ...req.body });

        const game = await getGameById(_id);
        console.log('masuk sini')

        await updateGameById({ _id, ...req.body, filename });
        removeValidationErrorImage(game.filenameImage);
        res.redirect('/catalog/games')
    } catch (error) {
        if (error.statusCode === 400) {
            try {
                const categoriesList = await getCategoriesData();
                if (req.body.categories) {
                    for (category of categoriesList) {
                        if (req.body.categories.includes(category._id)) {
                            category.checked = "true"
                        }
                    }
                }
                return res.render('gameForm', { game: req.body, error: error.message, categories: categoriesList });
            } catch (error) {
                if (error.statusCode === 404) {
                    return res.render("gameForm", { error: error.message, game: req.body })
                }
            }
        }
    }
}

module.exports = {
    getGamesIndexPage,
    getGameForm,
    postGameForm,
    getGamesDetailPage,
    deleteGame,
    getUpdateForm,
    postUpdateForm
}