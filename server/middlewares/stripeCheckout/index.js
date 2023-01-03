const compose = require('koa-compose')
const { authorizeCustomer, authorizeManagers } = require('../authorization')
const StripeCheckoutMiddleware = require('./stripeCheckoutMiddleware')

//TODO: Add proper validations in the middleware (userId & items)
const create = compose([authorizeCustomer, StripeCheckoutMiddleware.create])

const get = compose([StripeCheckoutMiddleware.get])

module.exports = {
  create,
  get,
}
