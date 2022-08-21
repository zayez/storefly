const Router = require('koa-router')
const router = new Router()

const { POST_SIGN_IN, POST_SIGN_UP, POST_USER } = require('../api/endpointUrls')

const UsersPipeline = require('../middlewares/users')

router.post(POST_SIGN_IN, UsersPipeline.signIn)
router.post(POST_SIGN_UP, UsersPipeline.signUp)
router.post(POST_USER, UsersPipeline.create)

module.exports = router
