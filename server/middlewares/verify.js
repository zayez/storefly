const { getResponse } = require('../helpers/routeHelpers')
const ActionStatus = require('../types/ActionStatus')
const User = require('../models/user')

const isAdmin = async (user) => {
  if (!user) return false

  return await User.hasRole(user, 'admin')
}
const isEditor = async (user) => {
  if (!user) return false
  return (
    (await User.hasRole(user, 'editor')) || (await User.hasRole(user, 'admin'))
  )
}

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

function disallowDuplicate(entity, attr) {
  const Entity = require('../models/entity')(entity)
  return async function (ctx, next) {
    try {
      const payload = {}
      payload[attr] = ctx.request.body[attr]
      const duplicated = await Entity.findOne(payload)

      if (duplicated) {
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
}

module.exports = {
  isAdmin,
  isEditor,
  userExists,
  entityExists,
  disallowDuplicate,
}
