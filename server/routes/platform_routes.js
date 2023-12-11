const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const platformController = require('../controllers/platformController')
const auth = require('../middlewares/auth')

// -- POST METHODS --
router.post('/create', auth.moderator, catchErrors(platformController.create))
router.post('/modify', auth.moderator, catchErrors(platformController.modify))
router.post('/delete', auth.moderator, catchErrors(platformController.delete))

router.post('/search', auth.moderator, catchErrors(platformController.searchByTitle))

// -- GET METHODS --
router.get('/:_plat_id', auth.moderator, catchErrors(platformController.getById))

module.exports = router