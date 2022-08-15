const Router = require('koa-router')
const compose = require('koa-compose')
const { authenticate } = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorization').isAdmin
const { isValidUser } = require('../middlewares/validations')
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
      const { action, data } = await signUp({ username, password }, roles)

      const { code, title, message } = getResponse(action)
      ctx.status = code
      ctx.body = { title, message }
      if (data) ctx.body = { ...ctx.body, ...data }
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
