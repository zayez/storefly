const { setBody, setBodyError } = require('../helpers/routeHelpers')
const ActionStatus = require('../types/ActionStatus')
const User = require('../models/user')

const isAuthorized = (roles) => {
  return async (user) => {
    if (!user) return false

    return await User.hasRole(user, roles)
  }
}

const isAdmin = async (user) => {
  if (!user) return false

  return await User.hasRole(user, ['admin'])
}

const isEditor = async (user) => {
  if (!user) return false
  return await User.hasRole(user, ['editor'])
}

async function userExists(ctx, next) {
  try {
    const { email } = ctx.request.body
    const foundUser = await User.findOne({ email })

    if (foundUser) {
      setBody({ ctx, action: ActionStatus.Conflict })
    }

    await next()
  } catch (err) {
    setBodyError(ctx, err)
  }
}

function entityExists(entity) {
  const Entity = require('../models/entity')(entity)
  return async function (ctx, next) {
    try {
      const { id } = ctx.params
      const foundEntity = await Entity.findById(id)

      if (!foundEntity) {
        setBody({ ctx, action: ActionStatus.NotFound })
        return
      }

      await next()
    } catch (err) {
      setBodyError(ctx, err)
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
        setBody({ ctx, action: ActionStatus.Conflict })
        return
      }

      await next()
    } catch (err) {
      setBodyError(ctx, err)
    }
  }
}

module.exports = {
  isAuthorized,
  isAdmin,
  isEditor,
  userExists,
  entityExists,
  disallowDuplicate,
}
