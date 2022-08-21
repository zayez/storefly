const Router = require('koa-router')
const router = new Router()

const {
  POST_PRODUCT,
  POST_PRODUCT_COLLECTION,
  PATCH_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
} = require('../api/endpointUrls')

const ProductsPipeline = require('../middlewares/products')

router.post(POST_PRODUCT, ProductsPipeline.create)
router.post(POST_PRODUCT_COLLECTION, ProductsPipeline.createCollection)
router.patch(PATCH_PRODUCT, ProductsPipeline.update)
router.delete(DELETE_PRODUCT, ProductsPipeline.destroy)
router.get(GET_PRODUCT, ProductsPipeline.get)
router.get(GET_PRODUCTS, ProductsPipeline.getAll)

module.exports = router
