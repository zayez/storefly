const compose = require('koa-compose')
const { authorizeCustomer } = require('../authorization')
const { validateOrder, validateItems } = require('./ordersValidation')
const OrdersMiddleware = require('./ordersMiddleware')
const { authenticate } = require('../authentication')

const placeOrder = compose([
  authenticate,
  authorizeCustomer,
  validateOrder,
  validateItems,
  OrdersMiddleware.placeOrder,
])

module.exports = {
  placeOrder,
}
