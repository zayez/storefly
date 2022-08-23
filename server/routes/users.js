const Router = require('koa-router')
const router = new Router()

const {
  POST_USER,
  PATCH_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
} = require('../api/endpointUrls')

const UsersPipeline = require('../middlewares/users')

router.post(POST_USER, UsersPipeline.create)
router.patch(PATCH_USER, UsersPipeline.update)
router.delete(DELETE_USER, UsersPipeline.destroy)
router.get(GET_USER, UsersPipeline.get)

module.exports = router
