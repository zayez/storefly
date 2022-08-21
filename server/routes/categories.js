const Router = require('koa-router')
const router = new Router()

const {
  POST_CATEGORY,
  PATCH_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORIES,
} = require('../api/endpointUrls')

const {
  create,
  update,
  destroy,
  get,
  getAll,
} = require('../middlewares/categories')

router.post(POST_CATEGORY, create)
router.patch(PATCH_CATEGORY, update)
router.delete(DELETE_CATEGORY, destroy)
router.get(GET_CATEGORY, get)
router.get(GET_CATEGORIES, getAll)

module.exports = router
