const categoryValidator = require("../validators/categoriesValidator");

const { postCategory, getCategoriesData } = require("../services/categoriesService");

async function getCategoriesIndexPage(req, res) {
    try {
        const games = await getCategoriesData()
        res.render("categoriesIndexPage", { games });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.render("categoriesIndexPage", { error: error.message });
        }
    }
}

function getFormCategory(req, res) {
    res.render("categoryForm");
}
async function postFormCategory(req, res) {
    try {
        categoryValidator(req.body);
        await postCategory(req.body);
        res.redirect('/catalog/categories');
    } catch (error) {
        if (error.statusCode === 400)
            return res.render("categoryForm", { category: req.body, error: error.message });
    }
}

module.exports = {
    getCategoriesIndexPage,
    getFormCategory,
    postFormCategory
}