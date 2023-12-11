const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const reviewController = require('../controllers/reviewController')
const auth = require('../middlewares/auth')

// -- POST METHODS --
router.post('/create', auth.user, catchErrors(reviewController.create))

// -- GET METHODS --
router.get('/by_game/:_game_id', auth.user, catchErrors(reviewController.getByGame))

module.exports = router