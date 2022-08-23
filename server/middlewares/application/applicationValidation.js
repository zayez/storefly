const { validateBody, validateParams } = require('../validations')
const { SignUp, SignIn, Id } = require('./applicationSchemas')

const isValidSignUp = async (ctx, next) =>
  await validateBody({ ctx, next }, SignUp)

const isValidSignIn = async (ctx, next) =>
  await validateBody({ ctx, next }, SignIn)

const isValidId = async (ctx, next) => await validateParams({ ctx, next }, Id)

module.exports = {
  isValidSignIn,
  isValidSignUp,
  isValidId,
}
