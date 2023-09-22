const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const reviewController = require('../controllers/reviewController')
const auth = require('../middlewares/auth')

router.post('/create', auth.user, catchErrors(reviewController.create))

router.get('/by_game/:_game_id', auth.user, catchErrors(reviewController.getByGame))

module.exports = router