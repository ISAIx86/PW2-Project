const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const gameController = require('../controllers/gameController')
const auth = require('../middlewares/auth')

router.post('/create', auth.moderator, catchErrors(gameController.create))
router.post('/modify', auth.moderator, catchErrors(gameController.modify))
router.post('/delete', auth.moderator, catchErrors(gameController.delete))
router.get('/details/:_gameid', catchErrors(gameController.getOne))

router.post('/search', catchErrors(gameController.searchByName))

module.exports = router