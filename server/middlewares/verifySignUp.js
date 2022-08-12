const { getResponse } = require('../helpers/routeHelpers')
const ActionStatus = require('../types/ActionStatus')
const { findUserByEmail } = require('../db/queries/users')

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

module.exports = {
  userExists,
}
