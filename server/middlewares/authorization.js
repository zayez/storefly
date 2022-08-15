const ActionStatus = require('../types/ActionStatus')
const { getResponse } = require('../helpers/routeHelpers')
const { userHasRole } = require('../models/user')

async function isAdmin(ctx, next) {
  try {
    const user = ctx.state.user

    const isAdmin = await userHasRole(user, 'admin')

    if (!isAdmin) {
      const { code, title, message } = getResponse(ActionStatus.Forbidden)
      ctx.status = code
      ctx.body = { title, message }
      return
    }
    await next()
  } catch (err) {
    throw err
  }
}

async function isEditor(ctx, next) {
  try {
    const user = ctx.state.user

    const isEditor = await userHasRole(user, 'editor')

    if (!isEditor) {
      const { code, title, message } = getResponse(ActionStatus.Forbidden)
      ctx.status = code
      ctx.body = { title, message }
      return
    }
    await next()
  } catch (err) {
    throw err
  }
}

module.exports = {
  isAdmin,
  isEditor,
}
