const express = require('express');
const router = express.Router();

const { getGamesIndexPage } = require('../controllers/games');

router.get('/games', getGamesIndexPage);

module.exports = router;
