const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')

router.post('/create', auth.user, catchErrors(postController.create))
router.post('/delete', auth.user, catchErrors(postController.delete))

router.get('/profile/:_username', auth.user, catchErrors(postController.getByUser))
router.get('/game/:_game_id', auth.user, catchErrors(postController.getByGame))
router.get('/feed', auth.user, catchErrors(postController.getFeed))

module.exports = router