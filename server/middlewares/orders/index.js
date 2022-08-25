const compose = require('koa-compose')
const { authorizeCustomer } = require('../authorization')
const {
  validateOrder,
  validateItems,
  validateGetAllByUser,
} = require('./ordersValidation')
const OrdersMiddleware = require('./ordersMiddleware')
const { authenticate } = require('../authentication')

const placeOrder = compose([
  authenticate,
  authorizeCustomer,
  validateOrder,
  validateItems,
  OrdersMiddleware.placeOrder,
])

const getAllByUser = compose([
  authenticate,
  authorizeCustomer,
  validateGetAllByUser,
  OrdersMiddleware.getAllByUser,
])

module.exports = {
  placeOrder,
  getAllByUser,
}
