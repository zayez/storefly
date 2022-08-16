const Router = require('koa-router')
const compose = require('koa-compose')
const { authenticate } = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorization').isAdmin
const { isValidUser } = require('../middlewares/validations/user')
const { userExists } = require('../middlewares/verify')
const { signUp } = require('../controllers/users')
const { getResponse } = require('../helpers/routeHelpers')

const router = new Router()

router.post(
  '/users',
  compose([authenticate, authorizeAdmin, isValidUser, userExists]),
  async (ctx) => {
    try {
      const { username, password } = ctx.request.body
      const roles = ctx.request.body.roles || ['customer']
      const { action, payload } = await signUp({ username, password }, roles)

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
  },
)

module.exports = router
