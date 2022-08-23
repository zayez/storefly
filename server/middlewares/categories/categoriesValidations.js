const { validateBody, validateQuery } = require('../validations')
const { Create, Update, GetAll } = require('./categoriesSchemas')

const isValidCreate = async (ctx, next) =>
  await validateBody({ ctx, next }, Create)

const isValidUpdate = async (ctx, next) =>
  await validateBody({ ctx, next }, Update)

const isValidGetAll = async (ctx, next) =>
  await validateQuery({ ctx, next }, GetAll)

module.exports = {
  isValidCreate,
  isValidUpdate,
  isValidGetAll,
}
