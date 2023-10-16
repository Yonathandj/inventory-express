const express = require('express');
const router = express.Router();

const { getGamesIndexPage, getGameForm } = require('../controllers/games');

router.get('/games', getGamesIndexPage);
router.route('/games/new')
    .get(getGameForm)

module.exports = router;
