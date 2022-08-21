const Router = require('koa-router')
const router = new Router()

const { POST_SIGN_IN, POST_SIGN_UP, POST_USER } = require('../api/endpointUrls')

const { signIn, signUp, create } = require('../middlewares/users')

router.post(POST_SIGN_IN, signIn)
router.post(POST_SIGN_UP, signUp)
router.post(POST_USER, create)

module.exports = router
