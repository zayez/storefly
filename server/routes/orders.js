const Router = require('koa-router')
const {
  POST_ORDER,
  GET_USER_ORDERS,
  GET_USER_ORDER,
} = require('../api/endpointUrls')
const OrdersPipeline = require('../middlewares/orders')
const router = new Router()

router.post(POST_ORDER, OrdersPipeline.placeOrder)
router.get(GET_USER_ORDERS, OrdersPipeline.getAllByUser)
router.get(GET_USER_ORDER, OrdersPipeline.getOneByUser)

module.exports = router
