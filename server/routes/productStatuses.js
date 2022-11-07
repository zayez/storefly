const Router = require('koa-router')
const { GET_PRODUCT_STATUSES } = require('../api/endpointUrls')
const ProductStatusesPipeline = require('../middlewares/productStatuses')

const router = new Router()
router.get(GET_PRODUCT_STATUSES, ProductStatusesPipeline.getAll)

module.exports = router
