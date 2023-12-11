const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const classificationController = require('../controllers/clasificationController')
const auth = require('../middlewares/auth')

// -- POST METHODS --
router.post('/create', auth.moderator, catchErrors(classificationController.create))
router.post('/modify', auth.moderator, catchErrors(classificationController.modify))
router.post('/delete', auth.moderator, catchErrors(classificationController.delete))

router.post('/search', auth.moderator, catchErrors(classificationController.searchByTitle))

// -- GET METHODS --
router.get('/:_class_id', auth.moderator, catchErrors(classificationController.getById))

module.exports = router