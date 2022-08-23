const { validateBody, validateQuery, validateFile } = require('../validations')

const {
  Create,
  UploadImage,
  CreateCollection,
  Update,
  GetAll,
} = require('./productsSchemas')

const isValidCreate = async (ctx, next) =>
  await validateBody({ ctx, next }, Create)

const isValidUpload = async (ctx, next) =>
  await validateFile({ ctx, next }, UploadImage)

const isValidCreateCollection = async (ctx, next) =>
  await validateBody({ ctx, next }, CreateCollection)

const isValidUpdate = async (ctx, next) =>
  await validateBody({ ctx, next }, Update)

const isValidGetAll = async (ctx, next) =>
  await validateQuery({ ctx, next }, GetAll)

module.exports = {
  isValidCreate,
  isValidUpload,
  isValidCreateCollection,
  isValidUpdate,
  isValidGetAll,
}
