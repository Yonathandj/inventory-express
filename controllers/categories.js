const categoryValidator = require("../validators/categoriesValidator");

const { postCategory, getCategoriesData, deleteCategoryById, getCategoryById, updateCategoryById } = require("../services/categoriesService");
const { getGamesRelatedCategory } = require("../services/gamesService");

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
        const category = await getCategoryById(req.params.id);
        const games = await getGamesRelatedCategory(req.params.id);
        res.render('categoryDetailPage', { category, games });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteCategory(req, res) {
    try {
        await deleteCategoryById(req.params.id);
        res.redirect('/catalog/categories');
    } catch (error) {
        if (error.statusCode === 400) {
            const category = await getCategoryById(req.params.id);
            const games = await getGamesRelatedCategory(req.params.id);
            res.render('categoryDetailPage', { category, games, error: error.message });
        }
    }
}

async function getFormUpdateCategory(req, res) {
    try {
        const category = await getCategoryById(req.params.id);
        res.render('categoryForm', { category, url: `catalog/categories/post-update/${category._id}` })
    } catch (error) {
        throw new Error(error.message);
    }
}

async function postFormUpdateCategory(req, res) {
    try {
        categoryValidator(req.body);
        const newCategory = { _id: req.params.id, name: req.body.name, description: req.body.description }
        await updateCategoryById(newCategory);
        res.redirect('/catalog/categories');
    } catch (error) {
        if (error.statusCode === 400)
            return res.render("categoryForm", { category: req.body, error: error.message });
    }
}

module.exports = {
    getCategoriesIndexPage,
    getFormCategory,
    postFormCategory,
    getCategoryDetailPage,
    deleteCategory,
    getFormUpdateCategory,
    postFormUpdateCategory
}