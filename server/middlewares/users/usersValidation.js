const { validateBody } = require('../validations')
const { Create, Update } = require('./usersSchemas')

const isValidCreate = async (ctx, next) =>
  await validateBody({ ctx, next }, Create)
const isValidUpdate = async (ctx, next) =>
  await validateBody({ ctx, next }, Update)

module.exports = {
  isValidCreate,
  isValidUpdate,
}
