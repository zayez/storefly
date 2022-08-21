const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const UsersController = require('../../controllers/users')

const signIn = async (ctx) => {
  try {
    const user = ctx.state.user
    const { action, payload } = await UsersController.signIn(user)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const signUp = async (ctx) => {
  try {
    const { email, password, firstName, lastName } = ctx.request.body
    const { action, payload } = await UsersController.signUp({
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

const create = async (ctx) => {
  try {
    const { username, password } = ctx.request.body
    const roles = ctx.request.body.roles || ['customer']
    const { action, payload } = await signUp({ username, password }, roles)

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  signIn,
  signUp,
  create,
}
