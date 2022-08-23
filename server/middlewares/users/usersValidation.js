const { setBody } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')
const { validateBody } = require('../validations')
const { Create, Update } = require('./usersSchemas')

const isValidCreate = async (ctx, next) =>
  await validateBody({ ctx, next }, Create)
const isValidUpdate = async (ctx, next) =>
  await validateBody({ ctx, next }, Update)

const matchUserId = async (ctx, next) => {
  if (Number(ctx.state.user.id) !== Number(ctx.params.id)) {
    setBody({ ctx, action: ActionStatus.Forbidden })
    return
  }
  await next()
}

module.exports = {
  isValidCreate,
  isValidUpdate,
  matchUserId,
}
