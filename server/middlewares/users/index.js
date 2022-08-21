const compose = require('koa-compose')
const { authorizeAdmin, authorizeCustomer } = require('../authorization')
const { entityExists, disallowDuplicate, userExists } = require('../verify')

const {
  isValidCreate,
  isValidUpdate,
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
  authorizeCustomer,
  isValidUpdate,
  matchUserId,
  UsersMiddleware.update,
])

module.exports = {
  create,
  update,
}
