const gameValidator = require("../validators/gamesValidator");

const { getGameFormDataCategories, postGame } = require("../services/gamesService");


function getGamesIndexPage(req, res) {
    res.render("gamesIndexPage");
}

async function getGameForm(req, res) {
    try {
        const categoriesList = await getGameFormDataCategories();
        res.render('gameForm', { categories: categoriesList });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.render("gameForm", { error: error.message })
        }

    }
}

async function postGameForm(req, res) {
    try {
        gameValidator(req.body);
        await postGame(req.body);
        res.redirect('/catalog/games')
    } catch (error) {
        if (error.statusCode === 400) {
            try {
                const categoriesList = await getGameFormDataCategories();
                if (req.body.categories) {
                    for (category of categoriesList) {
                        if (req.body.categories.includes(category._id)) {
                            category.checked = "true"
                        }
                    }
                }
                return res.render('gameForm', { game: req.body, error: error.message, categories: categoriesList });
            } catch (error) {
                return res.render("gameForm", { error: error.message, game: req.body })
            }
        }
    }
}

module.exports = {
    getGamesIndexPage,
    getGameForm,
    postGameForm,

}