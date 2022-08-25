const Router = require('koa-router')
const { POST_ORDER } = require('../api/endpointUrls')
const OrdersPipeline = require('../middlewares/orders')
const router = new Router()

router.post(POST_ORDER, OrdersPipeline.placeOrder)

module.exports = router
