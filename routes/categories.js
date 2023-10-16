const express = require('express');
const router = express.Router();

const { getCategoriesIndexPage, getFormCategory } = require('../controllers/categories');

router.get('/categories', getCategoriesIndexPage);
router.route('/categories/new')
    .get(getFormCategory)

module.exports = router;
