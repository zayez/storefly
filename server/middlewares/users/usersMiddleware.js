const { setResponse } = require('../../helpers/middlewareHelpers')
const UsersController = require('../../controllers/users')
const { isManager } = require('../../helpers/userHelpers')
const ActionStatus = require('../../types/ActionStatus')
const mapper = require('../../helpers/propsMapper').input

const create = async (ctx) => {
  try {
    const user = mapper.mapUser(ctx.request.body)
    const roles = ctx.request.body.roles || ['customer']
    const { action, payload } = await UsersController.create(user, roles)

    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const update = async (ctx) => {
  try {
    const id = ctx.state.user.id
    const user = ctx.request.body
    const { action, payload } = await UsersController.update(id, user)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const destroy = async (ctx) => {
  try {
    const id = ctx.state.user.id
    const { action, payload } = await UsersController.destroy(id)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const get = async (ctx) => {
  try {
    const user = ctx.state.user
    const id = isManager(user) ? ctx.params.id : ctx.state.user.id
    const { action, payload } = await UsersController.getOne(id)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const getAll = async (ctx) => {
  try {
    const { role } = ctx.query
    if (role) {
      const { action, payload } = await UsersController.getAllByRole(role)
      setResponse(ctx, { action, payload })
    } else {
      const { action, payload } = await UsersController.getAll()
      setResponse(ctx, { action, payload })
    }
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

module.exports = {
  create,
  update,
  destroy,
  get,
  getAll,
}
