const Router = require('koa-router')
const compose = require('koa-compose')
const router = new Router()

const { authorizeAdmin } = require('../middlewares/authorization')
const {
  isCreateValid,
  isUpdateValid,
  isDestroyValid,
  isGetValid,
  isGetAllValid,
} = require('../middlewares/validations/category')
const { setBody, setBodyError } = require('../helpers/routeHelpers')
const Categories = require('../controllers/categories')

const { entityExists, disallowDuplicate } = require('../middlewares/verify')

router.post(
  '/categories',
  compose([
    authorizeAdmin,
    isCreateValid,
    disallowDuplicate('categories', 'title'),
  ]),
  async (ctx) => {
    try {
      const { title } = ctx.request.body
      const category = { title }
      const { action, payload } = await Categories.create(category)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.patch(
  '/categories/:id',
  compose([authorizeAdmin, isUpdateValid, entityExists('categories')]),
  async (ctx) => {
    try {
      const { title } = ctx.request.body
      const category = { title }
      const { id } = ctx.params
      const { action, payload } = await Categories.update(id, category)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.delete(
  '/categories/:id',
  compose([authorizeAdmin, isDestroyValid]),
  async (ctx) => {
    try {
      const { id } = ctx.params
      const { action, payload } = await Categories.destroy(id)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.get(
  '/categories/:id',
  compose([authorizeAdmin, isGetValid]),
  async (ctx) => {
    try {
      const { id } = ctx.params
      const { action, payload } = await Categories.getOne(id)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.get(
  '/categories',
  compose([authorizeAdmin, isGetAllValid]),
  async (ctx) => {
    try {
      const { page } = ctx.request.query
      const { action, payload } = await Categories.getAll({ page })
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

module.exports = router
