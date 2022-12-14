const { deleteFile } = require('../../helpers/fsHelper')
const { setResponse } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')
const {
  validateBody,
  validateQuery,
  validateFile,
  isValidBody,
  isValidReference,
  isUnique,
  itExists,
} = require('../validations')

const {
  Create,
  UploadImage,
  CreateCollection,
  Update,
  GetAll,
} = require('./productsSchemas')

const isValidCreate = async (ctx) => isValidBody({ ctx }, Create)
const isValidUpdate = async (ctx) => isValidBody({ ctx }, Update)

const validateCreate = async (ctx, next) => {
  try {
    const validators = [
      isValidCreate,
      isValidReference('categoryId', 'categories'),
      isValidReference('statusId', 'productStatus'),
      isUnique('title', 'products'),
    ]
    for (const validator of validators) {
      const action = await validator(ctx)
      if (action.type !== ActionStatus.Ok) {
        if (ctx.request.file) {
          await deleteFile(ctx.request.file.path)
        }
        setResponse(ctx, { action: action.type, payload: action.payload })
        return
      }
    }
    await next()
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const validateUpdate = async (ctx, next) => {
  try {
    const validators = [
      isValidUpdate,
      isValidReference('categoryId', 'categories'),
      isValidReference('statusId', 'productStatus'),
      // isUnique('title', 'products'), // Have to fix this (on update it should skip current prod.)
      itExists('products'),
    ]
    for (let validator of validators) {
      const action = await validator(ctx)
      if (action.type !== ActionStatus.Ok) {
        if (ctx.request.file) {
          await deleteFile(ctx.request.file.path)
        }
        setResponse(ctx, { action: action.type, payload: action.payload })
        return
      }
    }
    await next()
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const validateUpload = async (ctx, next) =>
  await validateFile({ ctx, next }, UploadImage)

const validateCreateCollection = async (ctx, next) =>
  await validateBody({ ctx, next }, CreateCollection)

const validateGetAll = async (ctx, next) =>
  await validateQuery({ ctx, next }, GetAll)

module.exports = {
  isValidCreate,
  validateCreate,
  validateUpload,
  validateCreateCollection,
  validateUpdate,
  validateGetAll,
}
