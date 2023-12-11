const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const reportController = require('../controllers/reportController')
const auth = require('../middlewares/auth')

// -- POST METHODS --
router.post('/create', auth.user, catchErrors(reportController.create))
router.post('/close', auth.moderator, catchErrors(reportController.closeReport))

// -- GET METHODS --
router.get('/get', auth.moderator, catchErrors(reportController.getReports))
router.get('/deleted', auth.moderator, catchErrors(reportController.getDeleted))
router.get('/get/:_rep_id', auth.moderator, catchErrors(reportController.getReport))

module.exports = router