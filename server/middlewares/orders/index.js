const compose = require('koa-compose')
const { authorizeCustomer } = require('../authorization')
const { validateOrder } = require('./ordersValidation')
const OrdersMiddleware = require('./ordersMiddleware')
const { authenticate } = require('../authentication')

const placeOrder = compose([
  authenticate,
  authorizeCustomer,
  validateOrder,
  OrdersMiddleware.placeOrder,
])

module.exports = {
  placeOrder,
}
