const {
  validateBody,
  validateQuery,
  validateParams,
  validateFile,
} = require('../../../helpers/routeHelpers')
const schema = require('./productSchemas')

const isCreateValid = async (ctx, next) => {
  await validateBody({ ctx, next }, schema.create)
}

const isUploadValid = async (ctx, next) => {
  await validateFile({ ctx, next }, schema.uploadImage)
}

const isCreateCollectionValid = async (ctx, next) =>
  await validateBody({ ctx, next }, schema.createCollection)

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
  isUploadValid,
  isCreateCollectionValid,
  isUpdateValid,
  isDestroyValid,
  isValidGet,
  isValidGetAll,
}
