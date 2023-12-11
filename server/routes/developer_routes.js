const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const developerController = require('../controllers/developerController')
const auth = require('../middlewares/auth')

router.post('/create', auth.moderator, catchErrors(developerController.create))
router.post('/modify', auth.moderator, catchErrors(developerController.modify))
router.post('/delete', auth.moderator, catchErrors(developerController.delete))

router.post('/search', auth.moderator, catchErrors(developerController.searchByTitle))
router.get('/:_dev_id', auth.moderator, catchErrors(developerController.getById))

module.exports = router