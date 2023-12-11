const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandling/errorHandler')
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

// -- POST METHODS --
router.post('/register', catchErrors(userController.register))
router.post('/login', catchErrors(userController.login))
router.post('/login_mod', catchErrors(userController.loginMod))
router.post('/update', auth.user, catchErrors(userController.update))
router.post('/update/password', auth.user, catchErrors(userController.changePassword))
router.post('/delete', auth.user, catchErrors(userController.closeProfile))
router.post('/kill', auth.moderator, catchErrors(userController.killProfile))

router.post('/follow', auth.user, catchErrors(userController.follow))
router.post('/accept_follower', auth.user, catchErrors(userController.acceptFollower))
router.post('/deny_follower', auth.user, catchErrors(userController.denyFollower))
router.post('/unfollow', auth.user, catchErrors(userController.unfollow))

router.post('/search/username', auth.user, catchErrors(userController.searchUsername))

// -- GET METHODS --
router.get('/requests', auth.user, catchErrors(userController.requests))
router.get('/profile/:_username?', auth.user, catchErrors(userController.profile))
router.get('/profile_info', auth.user, catchErrors(userController.fillUpdateForm))

module.exports = router