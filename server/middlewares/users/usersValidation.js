const { validateBody } = require('../validations')
const { signUp, signIn, user } = require('./usersSchemas').schemas

const isValidSignUp = async (ctx, next) =>
  await validateBody({ ctx, next }, signUp)

const isValidSignIn = async (ctx, next) =>
  await validateBody({ ctx, next }, signIn)

const isValidUser = async (ctx, next) => await validateBody({ ctx, next }, user)

module.exports = {
  isValidSignIn,
  isValidSignUp,
  isValidUser,
}
