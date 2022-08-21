const compose = require('koa-compose')
const { authorizeAdmin } = require('../authorization')
const { entityExists, disallowDuplicate, userExists } = require('../verify')

const { authenticateLocal } = require('../authentication')
const {
  isValidSignIn,
  isValidSignUp,
  isValidUser,
} = require('./usersValidation')

const UsersMiddleware = require('./usersMiddleware')

const signIn = compose([
  isValidSignIn,
  authenticateLocal,
  UsersMiddleware.signIn,
])

const signUp = compose([isValidSignUp, userExists, UsersMiddleware.signUp])

const create = compose([
  authorizeAdmin,
  isValidUser,
  userExists,
  UsersMiddleware.create,
])

module.exports = {
  signIn,
  signUp,
  create,
}
