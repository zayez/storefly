const ActionStatus = require('../types/ActionStatus')
const { getResponse } = require('../helpers/routeHelpers')
const { isAdmin, isEditor } = require('./verify')

async function authorizeAdmin(ctx, next) {
  try {
    const user = ctx.state.user

    if (await isAdmin(user)) {
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

async function authorizeEditor(ctx, next) {
  try {
    const user = ctx.state.user

    if ((await isEditor(user)) || (await isAdmin(user))) {
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
  authorizeAdmin,
  authorizeEditor,
}
