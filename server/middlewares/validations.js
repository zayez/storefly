const { validateBody, validateQuery } = require('../helpers/routeHelpers')
const { signUp, signIn, user, id } = require('./validationSchemas').schemas

const isValidSignUp = async (ctx, next) =>
  await validateBody({ ctx, next }, signUp)

const isValidSignIn = async (ctx, next) =>
  await validateBody({ ctx, next }, signIn)

const isValidUser = async (ctx, next) => await validateBody({ ctx, next }, user)

const isValidId = async (ctx, next) => await validateQuery({ ctx, next }, id)

module.exports = {
  isValidSignIn,
  isValidSignUp,
  isValidUser,
  isValidId,
}
