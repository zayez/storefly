const compose = require('koa-compose')
const { authorizeAdmin, authorizeCustomer } = require('../authorization')
const { authenticate } = require('../authentication')
const { entityExists, disallowDuplicate, userExists } = require('../verify')

const {
  isValidCreate,
  isValidUpdate,
  isValidDestroy,
  matchUserId,
} = require('./usersValidation')

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
  isValidDestroy,
  matchUserId,
  UsersMiddleware.destroy,
])

module.exports = {
  create,
  update,
  destroy,
}
