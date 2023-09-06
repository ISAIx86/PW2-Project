const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.post('/login', catchErrors(userController.login))
router.post('/login_mod', catchErrors(userController.login_mod))
router.post('/register', catchErrors(userController.register))
router.post('/update', auth.user, catchErrors(userController.update))

module.exports = router