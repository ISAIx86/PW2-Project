const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const developerController = require('../controllers/developerController')
const auth = require('../middlewares/auth')

router.post('/create', auth.moderator, catchErrors(developerController.create))
router.post('/modify', auth.moderator, catchErrors(developerController.modify))
router.post('/delete', auth.moderator, catchErrors(developerController.delete))

module.exports = router