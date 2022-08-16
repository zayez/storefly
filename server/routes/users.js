const Router = require('koa-router')
const compose = require('koa-compose')
const { authorizeAdmin } = require('../middlewares/authorization')
const { isValidUser } = require('../middlewares/validations/user')
const { userExists } = require('../middlewares/verify')
const { signUp } = require('../controllers/users')
const { setBody, setBodyError } = require('../helpers/routeHelpers')

const router = new Router()

router.post(
  '/users',
  compose([authorizeAdmin, isValidUser, userExists]),
  async (ctx) => {
    try {
      const { username, password } = ctx.request.body
      const roles = ctx.request.body.roles || ['customer']
      const { action, payload } = await signUp({ username, password }, roles)

      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

module.exports = router
