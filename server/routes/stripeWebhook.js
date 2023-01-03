const Router = require('koa-router')
const { POST_STRIPE_WEBHOOK } = require('../api/endpointUrls')
const StripeWebhookPipeline = require('../middlewares/stripeWebhook')
const router = new Router()

router.post(POST_STRIPE_WEBHOOK, StripeWebhookPipeline.create)

module.exports = router
