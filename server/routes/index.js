const Router = require('koa-router')
const router = new Router()

const {
  GET_ROOT,
  POST_SIGN_IN,
  POST_SIGN_UP,
  GET_USER_LOGGED,
} = require('../api/endpointUrls')

const ApplicationPipeline = require('../middlewares/application')

router.get(GET_ROOT, ApplicationPipeline.getRoot)
router.post(POST_SIGN_IN, ApplicationPipeline.signIn)
router.post(POST_SIGN_UP, ApplicationPipeline.signUp)
router.get(GET_USER_LOGGED, ApplicationPipeline.getUser)

module.exports = router
