const Router = require('koa-router')
const { signIn, signUp, create } = require('../middlewares/users')
const router = new Router()

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/users', create)

module.exports = router
