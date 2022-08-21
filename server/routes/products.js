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

const {
  create,
  createCollection,
  update,
  destroy,
  get,
  getAll,
} = require('../middlewares/products')

router.post(POST_PRODUCT, create)
router.post(POST_PRODUCT_COLLECTION, createCollection)
router.patch(PATCH_PRODUCT, update)
router.delete(DELETE_PRODUCT, destroy)
router.get(GET_PRODUCT, get)
router.get(GET_PRODUCTS, getAll)

module.exports = router
