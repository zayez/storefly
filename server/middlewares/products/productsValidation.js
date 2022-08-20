const {
  validateBody,
  validateQuery,
  validateParams,
  validateFile,
} = require('../validations')

const {
  create,
  uploadImage,
  createCollection,
  update,
  destroy,
  get,
  getAll,
} = require('./productsSchemas')

const isCreateValid = async (ctx, next) =>
  await validateBody({ ctx, next }, create)

const isUploadValid = async (ctx, next) =>
  await validateFile({ ctx, next }, uploadImage)

const isCreateCollectionValid = async (ctx, next) =>
  await validateBody({ ctx, next }, createCollection)

const isUpdateValid = async (ctx, next) =>
  await validateBody({ ctx, next }, update)

const isDestroyValid = async (ctx, next) =>
  await validateParams({ ctx, next }, destroy)

const isValidGet = async (ctx, next) => await validateParams({ ctx, next }, get)

const isValidGetAll = async (ctx, next) =>
  await validateQuery({ ctx, next }, getAll)

module.exports = {
  isCreateValid,
  isUploadValid,
  isCreateCollectionValid,
  isUpdateValid,
  isDestroyValid,
  isValidGet,
  isValidGetAll,
}
