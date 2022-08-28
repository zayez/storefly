const ActionStatus = require('../types/ActionStatus')
const {
  setResponse,
  setResponseError,
} = require('../helpers/middlewareHelpers')
const User = require('../models/user')

const authorizeRoles = (roles = []) => {
  return async (ctx, next) => {
    try {
      const user = ctx.state.user
      if (!user) {
        setResponse(ctx, { action: ActionStatus.Forbidden })
        return
      }

      if (!(await User.hasRole(user, roles))) {
        setResponse(ctx, { action: ActionStatus.Forbidden })
      }
      await next()
    } catch (err) {
      setResponseError(ctx, { error: err })
    }
  }
}

const authorizeAdmin = authorizeRoles(['admin'])
const authorizeEditor = authorizeRoles(['editor'])
const authorizeCustomer = authorizeRoles(['customer'])
const authorizeManagers = authorizeRoles(['admin', 'editor'])

module.exports = {
  authorizeRoles,
  authorizeAdmin,
  authorizeEditor,
  authorizeCustomer,
  authorizeManagers,
}
