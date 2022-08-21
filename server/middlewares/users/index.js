const compose = require('koa-compose')
const { authorizeAdmin } = require('../authorization')
const { entityExists, disallowDuplicate, userExists } = require('../verify')

const { isValidUser } = require('./usersValidation')

const UsersMiddleware = require('./usersMiddleware')

const create = compose([
  authorizeAdmin,
  isValidUser,
  userExists,
  UsersMiddleware.create,
])

module.exports = {
  create,
}
