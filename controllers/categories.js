const categoryValidator = require("../validators/categoriesValidator");

function getCategoriesIndexPage(req, res) {
    res.render("categoriesIndexPage");
}

function getFormCategory(req, res) {
    res.render("categoryForm");
}
function postFormCategory(req, res) {
    try {
        categoryValidator(req);
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