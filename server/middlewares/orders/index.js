const compose = require('koa-compose')
const { authorizeCustomer, authorizeManagers } = require('../authorization')
const { isValidId } = require('../application/applicationValidation')
const {
  validateOrder,
  validateItems,
  validateGetAllByUser,
  validateGetOneByUser,
  validateAuthorization,
  validateGetAll,
} = require('./ordersValidation')
const OrdersMiddleware = require('./ordersMiddleware')

const placeOrder = compose([
  authorizeCustomer,
  validateOrder,
  validateItems,
  OrdersMiddleware.placeOrder,
])

const getAllByUser = compose([
  authorizeCustomer,
  validateAuthorization,
  validateGetAllByUser,
  OrdersMiddleware.getAllByUser,
])

const getOneByUser = compose([
  authorizeCustomer,
  validateAuthorization,
  validateGetOneByUser,
  OrdersMiddleware.getOneByUser,
])

const getAll = compose([
  authorizeManagers,
  validateGetAll,
  OrdersMiddleware.getAll,
])

const get = compose([authorizeManagers, isValidId, OrdersMiddleware.get])

module.exports = {
  placeOrder,
  getAllByUser,
  getOneByUser,
  getAll,
  get,
}
