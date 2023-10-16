const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const articleController = require('../controllers/articleController')
const auth = require('../middlewares/auth')

router.post('/like', auth.user, catchErrors(articleController.like))
router.post('/unlike', auth.user, catchErrors(articleController.unlike))
router.post('/kill', auth.moderator, catchErrors(articleController.killArticle))

module.exports = router