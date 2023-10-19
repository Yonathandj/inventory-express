const { nanoid } = require('nanoid');
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", 'public/gameImages'));
    },
    filename: function (req, file, cb) {
        cb(null, nanoid(16) + "-" + file.originalname)
    }
})

const upload = multer({ storage })

const { getGamesIndexPage, getGameForm, postGameForm, getGamesDetailPage, deleteGame, getUpdateForm, postUpdateForm } = require('../controllers/games');

router.get('/games', getGamesIndexPage);
router.route('/games/new')
    .get(getGameForm)
    .post(upload.single("gameImage"), postGameForm)

router.get('/games/:id', getGamesDetailPage)
router.post('/games/delete/:id', deleteGame);

router.route('/games/update/:id')
    .get(getUpdateForm)
    .post(postUpdateForm)

module.exports = router;
