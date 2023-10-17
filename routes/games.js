const express = require('express');
const router = express.Router();

const { getGamesIndexPage, getGameForm, postGameForm, getGamesDetailPage } = require('../controllers/games');

router.get('/games', getGamesIndexPage);
router.route('/games/new')
    .get(getGameForm)
    .post(postGameForm)

router.get('/games/:id', getGamesDetailPage)

module.exports = router;
