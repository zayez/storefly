const Router = require('koa-router')
const {
  POST_STRIPE_CHECKOUT,
  GET_STRIPE_CHECKOUT,
} = require('../api/endpointUrls')
const StripeCheckoutPipeline = require('../middlewares/stripeCheckout')
const router = new Router()

router.post(POST_STRIPE_CHECKOUT, StripeCheckoutPipeline.create)
router.get(GET_STRIPE_CHECKOUT, StripeCheckoutPipeline.get)

module.exports = router
