const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const classificationController = require('../controllers/clasificationController')
const auth = require('../middlewares/auth')

router.post('/create', auth.moderator, catchErrors(classificationController.create))
router.post('/modify', auth.moderator, catchErrors(classificationController.modify))
router.post('/delete', auth.moderator, catchErrors(classificationController.delete))

module.exports = router