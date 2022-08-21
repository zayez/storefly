const Router = require('koa-router')
const router = new Router()

const {
  POST_CATEGORY,
  PATCH_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORIES,
} = require('../api/endpointUrls')

const CategoriesPipeline = require('../middlewares/categories')

router.post(POST_CATEGORY, CategoriesPipeline.create)
router.patch(PATCH_CATEGORY, CategoriesPipeline.update)
router.delete(DELETE_CATEGORY, CategoriesPipeline.destroy)
router.get(GET_CATEGORY, CategoriesPipeline.get)
router.get(GET_CATEGORIES, CategoriesPipeline.getAll)

module.exports = router
