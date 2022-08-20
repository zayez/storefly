const ActionStatus = require('../types/ActionStatus')
const { isAdmin, isEditor } = require('./verify')
const { setBody, setBodyError } = require('../helpers/middlewareHelpers')
const User = require('../models/user')

function authorizeRoles(roles = []) {
  return async (ctx, next) => {
    try {
      const user = ctx.state.user
      if (!user) {
        setBody({ ctx, action: ActionStatus.Forbidden })
        return
      }

      if (!(await User.hasRole(user, roles))) {
        setBody({ ctx, action: ActionStatus.Forbidden })
      }
      await next()
    } catch (err) {
      setBodyError(ctx, err)
    }
  }
}

async function authorizeAdmin(ctx, next) {
  try {
    const user = ctx.state.user
    if (!user) {
      setBody({ ctx, action: ActionStatus.Forbidden })
      return
    }

    if (await isAdmin(user)) {
      await next()
    } else {
      setBody({ ctx, action: ActionStatus.Forbidden })
    }
  } catch (err) {
    setBodyError(ctx, err)
  }
}

async function authorizeEditor(ctx, next) {
  try {
    const user = ctx.state.user
    if (!user) {
      setBody({ ctx, action: ActionStatus.Forbidden })
      return
    }

    if (await isEditor(user)) {
      await next()
    } else {
      setBody({ ctx, action: ActionStatus.Forbidden })
    }
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  authorizeAdmin,
  authorizeEditor,
  authorizeRoles,
}
