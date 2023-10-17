const express = require('express');
const router = express.Router();

const { getGamesIndexPage, getGameForm, postGameForm } = require('../controllers/games');

router.get('/games', getGamesIndexPage);
router.route('/games/new')
    .get(getGameForm)
    .post(postGameForm)

module.exports = router;
