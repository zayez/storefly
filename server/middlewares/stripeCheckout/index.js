const compose = require('koa-compose')
const { authorizeCustomer, authorizeManagers } = require('../authorization')
const StripeCheckoutMiddleware = require('./StripeCheckoutMiddleware')

const create = compose([authorizeCustomer, StripeCheckoutMiddleware.create])

const get = compose([StripeCheckoutMiddleware.get])

module.exports = {
  create,
  get,
}
