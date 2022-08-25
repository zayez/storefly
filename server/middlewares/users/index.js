const compose = require('koa-compose')
const { authorizeAdmin, authorizeManagers } = require('../authorization')
const { authenticate } = require('../authentication')
const { entityExists, disallowDuplicate, userExists } = require('../verify')
const { isValidCreate, isValidUpdate } = require('./usersValidation')
const { matchUserId } = require('../validations')
const { isValidId } = require('../application/applicationValidation')

const UsersMiddleware = require('./usersMiddleware')
const { isCustomer, isManager } = require('../../helpers/userHelpers')

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

const authorizeUserAndManagers = async (ctx, next) => {
  const user = ctx.state.user
  if (isCustomer(user)) {
    await matchUserId(ctx, next)
  }
  if (isManager(user)) {
    await next()
  }
}

const get = compose([
  authenticate,
  isValidId,
  authorizeUserAndManagers,
  UsersMiddleware.get,
])

const getAll = compose([authorizeManagers, UsersMiddleware.getAll])

module.exports = {
  create,
  update,
  destroy,
  get,
  getAll,
}
