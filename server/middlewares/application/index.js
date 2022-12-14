const compose = require('koa-compose')
const { authenticate, authenticateLocal } = require('../authentication')
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

const signOut = compose([ApplicationMiddleware.signOut])

const getUser = compose([authenticate, ApplicationMiddleware.getUser])

module.exports = {
  getRoot,
  signIn,
  signUp,
  signOut,
  getUser,
}
