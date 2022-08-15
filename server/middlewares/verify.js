const { getResponse } = require('../helpers/routeHelpers')
const ActionStatus = require('../types/ActionStatus')
const User = require('../models/user')

async function userExists(ctx, next) {
  try {
    const { email } = ctx.request.body
    const foundUser = await User.findOne({ email })

    if (foundUser) {
      const { code, title, message } = getResponse(ActionStatus.Conflict)
      ctx.status = code
      ctx.body = { title, message }
      return
    }

    await next()
  } catch (err) {
    throw err
  }
}

function entityExists(entity) {
  const Entity = require('../models/entity')(entity)
  return async function (ctx, next) {
    try {
      const { id } = ctx.params
      const foundEntity = await Entity.findById(id)

      if (!foundEntity) {
        const { code, title, message } = getResponse(ActionStatus.NotFound)
        ctx.status = code
        ctx.body = { title, message }
        return
      }

      await next()
    } catch (err) {
      throw err
    }
  }
}

module.exports = {
  userExists,
  entityExists,
}
