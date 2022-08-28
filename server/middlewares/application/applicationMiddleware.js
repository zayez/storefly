const {
  setResponse,
  setResponseError,
} = require('../../helpers/middlewareHelpers')
const ApplicationController = require('../../controllers/application')
const mapper = require('../../helpers/propsMapper').input

const getRoot = async (ctx) => {
  try {
    const { action, payload } = await ApplicationController.getRoot()
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const signIn = async (ctx) => {
  try {
    const user = ctx.state.user
    const { action, payload } = await ApplicationController.signIn(user)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const signUp = async (ctx) => {
  try {
    const user = mapper.mapUser(ctx.request.body)
    const { action, payload } = await ApplicationController.signUp(user)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

module.exports = {
  getRoot,
  signIn,
  signUp,
}
