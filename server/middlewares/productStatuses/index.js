const compose = require('koa-compose')
const { authorizeAdmin, authorizeManagers } = require('../authorization')
const ProductStatusesMiddleware = require('./productStatusesMiddleware')

const getAll = compose([ProductStatusesMiddleware.getAll])

module.exports = {
  getAll,
}
