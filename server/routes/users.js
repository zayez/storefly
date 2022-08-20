const Router = require('koa-router')
const { create, signUp, signIn } = require('../middlewares/users')
const router = new Router()

router.post('/users', create)
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router
