const express = require('express');
const router = express.Router();

const { getGamesIndexPage, getGameForm, postGameForm, getGamesDetailPage, deleteGame, getUpdateForm } = require('../controllers/games');

router.get('/games', getGamesIndexPage);
router.route('/games/new')
    .get(getGameForm)
    .post(postGameForm)

router.get('/games/:id', getGamesDetailPage)
router.post('/games/delete/:id', deleteGame);

router.route('/games/update/:id')
    .get(getUpdateForm)
    .post(postUpdateForm)

module.exports = router;
