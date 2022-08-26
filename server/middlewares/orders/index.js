const compose = require('koa-compose')
const { authorizeCustomer } = require('../authorization')
const {
  validateOrder,
  validateItems,
  validateGetAllByUser,
  validateGetOneByUser,
  validateAuthorization,
} = require('./ordersValidation')
const OrdersMiddleware = require('./ordersMiddleware')
const { authenticate } = require('../authentication')
const { matchUserId } = require('../validations')

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
  validateAuthorization,
  validateGetAllByUser,
  OrdersMiddleware.getAllByUser,
])

const getOneByUser = compose([
  authenticate,
  authorizeCustomer,
  validateAuthorization,
  validateGetOneByUser,
  OrdersMiddleware.getOneByUser,
])

module.exports = {
  placeOrder,
  getAllByUser,
  getOneByUser,
}
