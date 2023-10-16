function getCategoriesIndexPage(req, res) {
    res.render("categoriesIndexPage");
}

function getFormCategory(req, res) {
    res.render("categoryForm");
}

module.exports = {
    getCategoriesIndexPage,
    getFormCategory
}