const compose = require('koa-compose')
const { authorizeAdmin, authorizeCustomer } = require('../authorization')
const { authenticate } = require('../authentication')
const { entityExists, disallowDuplicate, userExists } = require('../verify')

const {
  isValidCreate,
  isValidUpdate,
  matchUserId,
} = require('./usersValidation')

const { isValidId } = require('../application/applicationValidation')

const UsersMiddleware = require('./usersMiddleware')

const create = compose([
  authorizeAdmin,
  isValidCreate,
  userExists,
  UsersMiddleware.create,
])

const update = compose([
  authenticate,
  isValidUpdate,
  matchUserId,
  UsersMiddleware.update,
])

const destroy = compose([
  authenticate,
  isValidId,
  matchUserId,
  UsersMiddleware.destroy,
])

const get = compose([authenticate, isValidId, matchUserId, UsersMiddleware.get])

module.exports = {
  create,
  update,
  destroy,
  get,
}
