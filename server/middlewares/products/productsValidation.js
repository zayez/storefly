const { deleteFile } = require('../../helpers/fsHelper')
const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
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

/*
TODO:
- Rename props (maybe to action?)
- Create a new enum (ActionType?)
- Maybe something like react (action.type & action payload)
*/
const validateCreate = async (ctx, next) => {
  try {
    let props
    const validators = [
      isValidCreate,
      isValidReference('categoryId', 'categories'),
      isValidReference('statusId', 'productStatus'),
      isUnique('title', 'products'),
    ]
    for (const validator of validators) {
      props = await validator(ctx)
      if (props.action !== ActionStatus.Ok) {
        if (ctx.request.file) {
          await deleteFile(ctx.request.file.path)
        }
        setBody({ ctx, action: props.action, payload: props.payload })
        return
      }
    }
    await next()
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const validateUpdate = async (ctx, next) => {
  try {
    let props
    const validators = [
      isValidUpdate,
      isValidReference('categoryId', 'categories'),
      isValidReference('statusId', 'productStatus'),
      // isUnique('title', 'products'), // Have to fix this (on update it should skip current prod.)
      itExists('products'),
    ]
    for (let validator of validators) {
      props = await validator(ctx)
      if (props.action !== ActionStatus.Ok) {
        if (ctx.request.file) {
          await deleteFile(ctx.request.file.path)
        }
        setBody({ ctx, action: props.action, payload: props.payload })
        return
      }
    }
    await next()
  } catch (err) {
    setBodyError(ctx, err)
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
