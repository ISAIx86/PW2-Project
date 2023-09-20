const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const genreController = require('../controllers/genreController')
const auth = require('../middlewares/auth')

router.post('/create', auth.moderator, catchErrors(genreController.create))
router.post('/modify', auth.moderator, catchErrors(genreController.modify))
router.post('/delete', auth.moderator, catchErrors(genreController.delete))

router.post('/search', auth.moderator, catchErrors(genreController.searchByTitle))
router.get('/:_genre_id', auth.moderator, catchErrors(genreController.getById))

module.exports = router