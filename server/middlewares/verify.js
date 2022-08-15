const { getResponse } = require('../helpers/routeHelpers')
const ActionStatus = require('../types/ActionStatus')
const { findUserByEmail } = require('../models/user')
const { findEntity } = require('../models/entity')

async function userExists(ctx, next) {
  try {
    const { email } = ctx.request.body
    const foundUser = await findUserByEmail(email)

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
  return async function (ctx, next) {
    try {
      const { id } = ctx.params
      const foundEntity = await findEntity(entity, id)

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
