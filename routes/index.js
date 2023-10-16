const express = require('express');
const router = express.Router();

const { getIndexPage } = require('../controllers');

router.get('/', getIndexPage);

module.exports = router;
