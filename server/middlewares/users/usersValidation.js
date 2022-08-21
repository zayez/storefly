const { setBody } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')
const { validateBody } = require('../validations')
const { create, update } = require('./usersSchemas')

const isValidCreate = async (ctx, next) =>
  await validateBody({ ctx, next }, create)
const isValidUpdate = async (ctx, next) =>
  await validateBody({ ctx, next }, update)

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
