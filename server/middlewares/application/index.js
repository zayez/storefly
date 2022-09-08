const compose = require('koa-compose')
const { authenticateLocal } = require('../authentication')
const ApplicationMiddleware = require('./applicationMiddleware')
const { isValidSignIn, isValidSignUp } = require('./applicationValidation')
const { entityExists, disallowDuplicate, userExists } = require('../verify')

const getRoot = compose([ApplicationMiddleware.getRoot])

const signIn = compose([
  isValidSignIn,
  authenticateLocal,
  ApplicationMiddleware.signIn,
])

const signUp = compose([
  isValidSignUp,
  userExists,
  ApplicationMiddleware.signUp,
])

const getUser = compose([ApplicationMiddleware.getUser])

module.exports = {
  getRoot,
  signIn,
  signUp,
  getUser,
}
