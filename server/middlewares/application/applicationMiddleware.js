const { setResponse } = require('../../helpers/middlewareHelpers')
const ApplicationController = require('../../controllers/application')
const ActionStatus = require('../../types/ActionStatus')
const mapper = require('../../helpers/propsMapper').input

const getRoot = async (ctx) => {
  try {
    const { action, payload } = await ApplicationController.getRoot()
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const signIn = async (ctx) => {
  try {
    const user = ctx.state.user
    const { action, payload } = await ApplicationController.signIn(user)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const signUp = async (ctx) => {
  try {
    const user = mapper.mapUser(ctx.request.body)
    const { action, payload } = await ApplicationController.signUp(user)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

module.exports = {
  getRoot,
  signIn,
  signUp,
}
