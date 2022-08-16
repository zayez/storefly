const ActionStatus = require('../types/ActionStatus')
const { getResponse } = require('../helpers/routeHelpers')
const User = require('../models/user')

async function isAdmin(ctx, next) {
  try {
    const user = ctx.state.user

    const isAdmin = await User.hasRole(user, 'admin')

    if (isAdmin) {
      await next()
    } else {
      const { code, title, message } = getResponse(ActionStatus.Forbidden)
      ctx.status = code
      ctx.body = { title, message }
      return
    }
  } catch (err) {
    throw err
  }
}

async function isEditor(ctx, next) {
  try {
    const user = ctx.state.user

    const isEditor = await User.hasRole(user, 'editor')
    const isAdmin = await User.hasRole(user, 'admin')

    if (isEditor || isAdmin) {
      await next()
    } else {
      const { code, title, message } = getResponse(ActionStatus.Forbidden)
      ctx.status = code
      ctx.body = { title, message }
      return
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  isAdmin,
  isEditor,
}
