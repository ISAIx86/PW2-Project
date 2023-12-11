const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const articleController = require('../controllers/articleController')
const auth = require('../middlewares/auth')

// -- POST METHODS --
router.post('/like', auth.user, catchErrors(articleController.like))
router.post('/unlike', auth.user, catchErrors(articleController.unlike))
router.post('/kill', auth.moderator, catchErrors(articleController.killArticle))

module.exports = router