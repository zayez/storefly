const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const UsersController = require('../../controllers/users')

const create = async (ctx) => {
  try {
    const { firstName, lastName, email, password } = ctx.request.body
    const roles = ctx.request.body.roles || ['customer']
    const { action, payload } = await UsersController.create(
      { firstName, lastName, email, password },
      roles,
    )

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  create,
}
