const {
  validateBody,
  validateQuery,
  validateParams,
} = require('../../../helpers/routeHelpers')

const schema = require('./productSchemas')

const isCreateValid = async (ctx, next) =>
  await validateBody({ ctx, next }, schema.create)

const isUpdateValid = async (ctx, next) =>
  await validateBody({ ctx, next }, schema.update)

const isDestroyValid = async (ctx, next) =>
  await validateParams({ ctx, next }, schema.destroy)

const isValidGet = async (ctx, next) =>
  await validateParams({ ctx, next }, schema.get)

const isValidGetAll = async (ctx, next) =>
  await validateQuery({ ctx, next }, schema.getAll)

module.exports = {
  isCreateValid,
  isUpdateValid,
  isDestroyValid,
  isValidGet,
  isValidGetAll,
}
