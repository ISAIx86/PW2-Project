const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const gameController = require('../controllers/gameController')
const auth = require('../middlewares/auth')

// -- POST METHODS --
router.post('/create', auth.moderator, catchErrors(gameController.create))
router.post('/modify', auth.moderator, catchErrors(gameController.modify))
router.post('/delete', auth.moderator, catchErrors(gameController.delete))
router.post('/follow', auth.user, catchErrors(gameController.follow))
router.post('/unfollow', auth.user, catchErrors(gameController.unfollow))

router.post('/search', auth.user, catchErrors(gameController.searchByName))

// -- GET METHODS --
router.get('/details/:_game_id', auth.user, catchErrors(gameController.getOne))

module.exports = router