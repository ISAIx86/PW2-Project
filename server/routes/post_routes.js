const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')

// -- POST METHODS --
router.post('/create', auth.user, catchErrors(postController.create))
router.post('/delete', auth.user, catchErrors(postController.delete))

// -- GET METHODS --
router.get('/profile/:_username', auth.user, catchErrors(postController.getByUser))
router.get('/game/:_game_id', auth.user, catchErrors(postController.getByGame))
router.get('/feed', auth.user, catchErrors(postController.getFeed))

module.exports = router