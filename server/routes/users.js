const Router = require('koa-router')
const router = new Router()

const { POST_USER, PATCH_USER } = require('../api/endpointUrls')

const UsersPipeline = require('../middlewares/users')

router.post(POST_USER, UsersPipeline.create)
router.patch(PATCH_USER, UsersPipeline.update)

module.exports = router
