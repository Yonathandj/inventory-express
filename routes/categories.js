const express = require('express');
const router = express.Router();

const { getCategoriesIndexPage, getFormCategory, postFormCategory, getCategoryDetailPage } = require('../controllers/categories');

router.get('/categories', getCategoriesIndexPage);
router.route('/categories/new')
    .get(getFormCategory)
    .post(postFormCategory)

router.get('/categories/:id', getCategoryDetailPage);

module.exports = router;
