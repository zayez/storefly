const Router = require('koa-router')
const compose = require('koa-compose')
const router = new Router()

const { authenticateLocal } = require('../middlewares/authentication')
const { userExists } = require('../middlewares/verify')
const { isValidSignIn, isValidSignUp } = require('../middlewares/validations')
const { signUp, signIn } = require('../controllers/users')
const { getResponse } = require('../helpers/routeHelpers')

router.get('/', async (ctx) => {
  ctx.body = {
    message: 'hella!',
  }
})

router.post('/signup', compose([isValidSignUp, userExists]), async (ctx) => {
  try {
    const { email, password, firstName, lastName } = ctx.request.body
    const { action, payload } = await signUp({
      email,
      password,
      firstName,
      lastName,
    })
    const { code, title, message } = getResponse(action)

    ctx.status = code
    ctx.body = { title, message }
    if (payload) ctx.body = { ...ctx.body, ...payload }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      title: 'Server error',
      message: err,
    }
  }
})

router.post(
  '/signin',
  compose([isValidSignIn, authenticateLocal]),
  async (ctx) => {
    const user = ctx.state.user
    const { action, payload } = await signIn(user)
    const { code, title, message } = getResponse(action)
    ctx.status = code
    ctx.body = { title, message }
    if (payload) ctx.body = { ...ctx.body, ...payload }
  },
)

module.exports = router
