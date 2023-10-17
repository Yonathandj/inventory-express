const express = require('express');
const router = express.Router();

const { getCategoriesIndexPage, getFormCategory, postFormCategory, getCategoryDetailPage, deleteCategory } = require('../controllers/categories');

router.get('/categories', getCategoriesIndexPage);
router.route('/categories/new')
    .get(getFormCategory)
    .post(postFormCategory)

router.get('/categories/:id', getCategoryDetailPage);

router.post('/categories/delete/:id', deleteCategory);

module.exports = router;
