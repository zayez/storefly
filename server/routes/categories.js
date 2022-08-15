const Router = require('koa-router')
const compose = require('koa-compose')
const router = new Router()

const { authenticate } = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorization').isAdmin
const {
  isValidCategory,
  isValidUpdateCategory,
  isValidDeleteCategory,
  isValidFetchCategoryParams,
  isValidFetchCategoriesQuery,
} = require('../middlewares/validations')
const { setBody, setBodyError } = require('../helpers/routeHelpers')
const Categories = require('../controllers/categories')

const { entityExists } = require('../middlewares/verify')

router.post(
  '/categories',
  compose([authenticate, authorizeAdmin, isValidCategory]),
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

router.put(
  '/categories/:id',
  compose([
    authenticate,
    authorizeAdmin,
    isValidUpdateCategory,
    entityExists('categories'),
  ]),
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
  compose([authenticate, authorizeAdmin, isValidDeleteCategory]),
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
  compose([authenticate, authorizeAdmin, isValidFetchCategoryParams]),
  async (ctx) => {
    try {
      const id = ctx.params.id
      const { action, payload } = await Categories.getOne(id)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.get(
  '/categories',
  compose([authenticate, authorizeAdmin, isValidFetchCategoriesQuery]),
  async (ctx) => {
    try {
      const { page } = ctx.request.query
      const { action, payload } = await Categories.getAll(page)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

module.exports = router
