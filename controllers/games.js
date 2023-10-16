const { getGameFormData } = require("../services/gamesService");

function getGamesIndexPage(req, res) {
    res.render("gamesIndexPage");
}

async function getGameForm(req, res) {
    try {
        const categoriesList = await getGameFormData();
        res.render('gameForm', { categories: categoriesList });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.render("gameForm", { error: error.message })
        }

    }
}

module.exports = {
    getGamesIndexPage,
    getGameForm
}