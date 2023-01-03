const compose = require('koa-compose')
const StripeWebhookMiddleware = require('./stripeWebhookMiddleware')

const create = compose([StripeWebhookMiddleware.create])

module.exports = {
  create,
}
