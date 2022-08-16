const ActionStatus = require('../types/ActionStatus')
const { isAdmin, isEditor } = require('./verify')
const { setBody, setBodyError } = require('../helpers/routeHelpers')
async function authorizeAdmin(ctx, next) {
  try {
    const user = ctx.state.user

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

    if ((await isEditor(user)) || (await isAdmin(user))) {
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
}
