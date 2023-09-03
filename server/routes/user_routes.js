const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.post('/login', catchErrors(userController.login))
router.post('/register', catchErrors(userController.register))
router.post('/update', auth, catchErrors(userController.update))

module.exports = router