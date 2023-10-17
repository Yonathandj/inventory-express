const categoryValidator = require("../validators/categoriesValidator");

const { postCategory, getCategoriesData, getCategoryDetailData } = require("../services/categoriesService");

async function getCategoriesIndexPage(req, res) {
    try {
        const categories = await getCategoriesData()
        res.render("categoriesIndexPage", { categories });
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

async function getCategoryDetailPage(req, res) {
    try {
        const { gamesRelatedToCategory, categoryDetail } = await getCategoryDetailData(req.params.id);
        res.render('categoryDetailPage', { category: categoryDetail, games: gamesRelatedToCategory });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getCategoriesIndexPage,
    getFormCategory,
    postFormCategory,
    getCategoryDetailPage
}