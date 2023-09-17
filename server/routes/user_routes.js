const router = require('express').Router()
const {catchErrors} = require('../handlers/errorHandler')
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.post('/register', catchErrors(userController.register))
router.post('/login', catchErrors(userController.login))
router.post('/login_mod', catchErrors(userController.loginMod))
router.post('/update', auth.user, catchErrors(userController.update))
router.post('/update/password', auth.user, catchErrors(userController.changePassword))
router.post('/delete', auth.user, catchErrors(userController.closeProfile))

router.get('/profile/:_username?', auth.user, catchErrors(userController.profile))

router.post('/search/username', auth.user, catchErrors(userController.searchUsername))

module.exports = router