const categoryValidator = require("../validators/categoriesValidator");

const { postCategory } = require("../services/categoriesService");

function getCategoriesIndexPage(req, res) {
    res.render("categoriesIndexPage");
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