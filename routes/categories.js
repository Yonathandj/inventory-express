const express = require('express');
const router = express.Router();

const { getCategoriesIndexPage, getFormCategory, postFormCategory, getCategoryDetailPage, deleteCategory, getFormUpdateCategory, postFormUpdateCategory } = require('../controllers/categories');

router.get('/categories', getCategoriesIndexPage);
router.route('/categories/new')
    .get(getFormCategory)
    .post(postFormCategory)

router.get('/categories/:id', getCategoryDetailPage);

router.post('/categories/delete/:id', deleteCategory);
router.get('/categories/update/:id', getFormUpdateCategory)
router.post('/categories/post-update/:id', postFormUpdateCategory)

module.exports = router;
