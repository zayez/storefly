const { validateBody, validateParams } = require('../validations')
const { signUp, signIn, Id } = require('./applicationSchemas')

const isValidSignUp = async (ctx, next) =>
  await validateBody({ ctx, next }, signUp)

const isValidSignIn = async (ctx, next) =>
  await validateBody({ ctx, next }, signIn)

const isValidId = async (ctx, next) => await validateParams({ ctx, next }, Id)

module.exports = {
  isValidSignIn,
  isValidSignUp,
  isValidId,
}
