const Router = require('koa-router')
const router = new Router()

const { POST_USER } = require('../api/endpointUrls')

const UsersPipeline = require('../middlewares/users')

router.post(POST_USER, UsersPipeline.create)

module.exports = router
