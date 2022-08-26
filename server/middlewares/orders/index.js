const compose = require('koa-compose')
const { authorizeCustomer, authorizeManagers } = require('../authorization')
const {
  validateOrder,
  validateItems,
  validateGetAllByUser,
  validateGetOneByUser,
  validateAuthorization,
  validateGetAll,
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

const getAll = compose([
  authenticate,
  authorizeManagers,
  validateGetAll,
  OrdersMiddleware.getAll,
])

module.exports = {
  placeOrder,
  getAllByUser,
  getOneByUser,
  getAll,
}
