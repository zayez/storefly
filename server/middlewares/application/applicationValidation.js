const { validateBody } = require('../validations')
const { signUp, signIn } = require('./applicationSchemas')

const isValidSignUp = async (ctx, next) =>
  await validateBody({ ctx, next }, signUp)

const isValidSignIn = async (ctx, next) =>
  await validateBody({ ctx, next }, signIn)

module.exports = {
  isValidSignIn,
  isValidSignUp,
}
