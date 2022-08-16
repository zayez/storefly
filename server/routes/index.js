const Router = require('koa-router')
const compose = require('koa-compose')
const router = new Router()

const { authenticateLocal } = require('../middlewares/authentication')
const { userExists } = require('../middlewares/verify')
const {
  isValidSignIn,
  isValidSignUp,
} = require('../middlewares/validations/user')
const { signUp, signIn } = require('../controllers/users')
const { setBody, setBodyError } = require('../helpers/routeHelpers')

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

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
})

router.post(
  '/signin',
  compose([isValidSignIn, authenticateLocal]),
  async (ctx) => {
    try {
      const user = ctx.state.user
      const { action, payload } = await signIn(user)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

module.exports = router
