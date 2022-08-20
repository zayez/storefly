const compose = require('koa-compose')
const { authorizeAdmin } = require('../authorization')
const { entityExists, disallowDuplicate, userExists } = require('../verify')
const { setBody, setBodyError } = require('../../helpers/routeHelpers')
const Users = require('../../controllers/users')

const { authenticateLocal } = require('../authentication')
const {
  isValidSignIn,
  isValidSignUp,
  isValidUser,
} = require('./usersValidation')

const signUp = async (ctx) => {
  try {
    const { email, password, firstName, lastName } = ctx.request.body
    const { action, payload } = await Users.signUp({
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

const pipelineSignUp = compose([isValidSignUp, userExists, signUp])

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

const pipelineCreate = compose([
  authorizeAdmin,
  isValidUser,
  userExists,
  create,
])

const signIn = async (ctx) => {
  try {
    const user = ctx.state.user
    const { action, payload } = await Users.signIn(user)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineSignIn = compose([isValidSignIn, authenticateLocal, signIn])

module.exports = {
  signUp: pipelineSignUp,
  signIn: pipelineSignIn,
  create: pipelineCreate,
}
