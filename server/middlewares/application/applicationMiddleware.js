const { setResponse } = require('../../helpers/middlewareHelpers')
const ApplicationController = require('../../controllers/application')
const ActionStatus = require('../../types/ActionStatus')
const mapper = require('../../helpers/propsMapper').input
const mapUser = require('../../helpers/propsMapper').output.mapUser

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
    const cookieOpts = {
      httpOnly: true,
      sameSite: true,
      path: '/',
      secure: false,
      signed: false,
    }
    ctx.cookies.set('token', payload.token, cookieOpts)
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

const getUser = async (ctx) => {
  try {
    if (!ctx.state.user) {
      setResponse(ctx, { action: ActionStatus.Unauthorized })
      return
    }
    const user = mapUser(ctx.state.user)
    setResponse(ctx, { action: ActionStatus.Ok, payload: user })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

module.exports = {
  getRoot,
  signIn,
  signUp,
  getUser,
}
