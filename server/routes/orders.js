const Router = require('koa-router')
const { POST_ORDER, GET_USER_ORDERS } = require('../api/endpointUrls')
const OrdersPipeline = require('../middlewares/orders')
const router = new Router()

router.post(POST_ORDER, OrdersPipeline.placeOrder)
router.get(GET_USER_ORDERS, OrdersPipeline.getAllByUser)

module.exports = router
