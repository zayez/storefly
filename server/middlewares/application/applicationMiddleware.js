const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const ApplicationController = require('../../controllers/application')

const getRoot = async (ctx) => {
  try {
    const { action, payload } = await ApplicationController.getRoot()
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const signIn = async (ctx) => {
  try {
    const user = ctx.state.user
    const { action, payload } = await ApplicationController.signIn(user)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const signUp = async (ctx) => {
  try {
    const { email, password, firstName, lastName } = ctx.request.body
    const { action, payload } = await ApplicationController.signUp({
      email,
      password,
      firstName,
      lastName,
    })

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  getRoot,
  signIn,
  signUp,
}
