const { validateBody, validateQuery } = require('../helpers/routeHelpers')
const { signUp, signIn, user, id, category, deleteCategory, updateCategory } =
  require('./validationSchemas').schemas

const isValidSignUp = async (ctx, next) =>
  await validateBody({ ctx, next }, signUp)

const isValidSignIn = async (ctx, next) =>
  await validateBody({ ctx, next }, signIn)

const isValidUser = async (ctx, next) => await validateBody({ ctx, next }, user)

const isValidCategory = async (ctx, next) =>
  await validateBody({ ctx, next }, category)

const isValidUpdateCategory = async (ctx, next) =>
  await validateBody({ ctx, next }, updateCategory)

const isValidDeleteCategory = async (ctx, next) =>
  await validateBody({ ctx, next }, deleteCategory)

const isValidId = async (ctx, next) => await validateQuery({ ctx, next }, id)

module.exports = {
  isValidSignIn,
  isValidSignUp,
  isValidUser,
  isValidCategory,
  isValidUpdateCategory,
  isValidDeleteCategory,
  isValidId,
}
