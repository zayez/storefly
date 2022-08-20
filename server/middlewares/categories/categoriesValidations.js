const {
  validateBody,
  validateQuery,
  validateParams,
} = require('../validations')
const { create, update, destroy, get, getAll } = require('./categoriesSchemas')

const isCreateValid = async (ctx, next) =>
  await validateBody({ ctx, next }, create)

const isUpdateValid = async (ctx, next) =>
  await validateBody({ ctx, next }, update)

const isDestroyValid = async (ctx, next) =>
  await validateParams({ ctx, next }, destroy)

const isGetValid = async (ctx, next) => await validateParams({ ctx, next }, get)

const isGetAllValid = async (ctx, next) =>
  await validateQuery({ ctx, next }, getAll)

module.exports = {
  isCreateValid,
  isUpdateValid,
  isDestroyValid,
  isGetValid,
  isGetAllValid,
}