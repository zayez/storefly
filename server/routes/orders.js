const Router = require('koa-router')
const {
  POST_ORDER,
  GET_USER_ORDERS,
  GET_USER_ORDER,
  GET_ORDERS,
  GET_ORDER,
  PATCH_ORDER_MARK_SHIPPING_STATUS,
} = require('../api/endpointUrls')
const OrdersPipeline = require('../middlewares/orders')
const router = new Router()

router.post(POST_ORDER, OrdersPipeline.placeOrder)
router.get(GET_USER_ORDERS, OrdersPipeline.getAllByUser)
router.get(GET_USER_ORDER, OrdersPipeline.getOneByUser)
router.get(GET_ORDER, OrdersPipeline.get)
router.get(GET_ORDERS, OrdersPipeline.getAll)
router.patch(
  PATCH_ORDER_MARK_SHIPPING_STATUS,
  OrdersPipeline.markShippingStatus,
)

module.exports = router
