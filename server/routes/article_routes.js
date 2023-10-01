const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const articleController = require('../controllers/articleController')
const auth = require('../middlewares/auth')

router.post('/like', auth.user, catchErrors(articleController.like))
router.post('/unlike', auth.user, catchErrors(articleController.unlike))

module.exports = router