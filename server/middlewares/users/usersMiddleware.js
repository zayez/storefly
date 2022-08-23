const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const UsersController = require('../../controllers/users')
const mapper = require('../../helpers/propsMapper').input

const create = async (ctx) => {
  try {
    const user = mapper.mapUser(ctx.request.body)
    const roles = ctx.request.body.roles || ['customer']
    const { action, payload } = await UsersController.create(user, roles)

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const update = async (ctx) => {
  try {
    const id = ctx.state.user.id
    const user = ctx.request.body
    const { action, payload } = await UsersController.update(id, user)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  create,
  update,
}
