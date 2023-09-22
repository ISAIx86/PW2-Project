const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')

router.post('/create', auth.user, catchErrors(postController.create))

module.exports = router