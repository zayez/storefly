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
const { getResponse } = require('../helpers/routeHelpers')
const {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategory,
  fetchCategories,
} = require('../controllers/categories')

const { entityExists } = require('../middlewares/verify')

router.post(
  '/categories',
  compose([authenticate, authorizeAdmin, isValidCategory]),
  async (ctx) => {
    try {
      const categoryTitle = ctx.request.body.title
      const category = { title: categoryTitle }
      const { action, data } = await createCategory(category)
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
      const categoryTitle = ctx.request.body.title
      const category = { title: categoryTitle }
      const { id } = ctx.params
      const { action, data } = await updateCategory(id, category)
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

router.delete(
  '/categories',
  compose([authenticate, authorizeAdmin, isValidDeleteCategory]),
  async (ctx) => {
    try {
      const { id } = ctx.request.body
      const { action, data } = await deleteCategory(id)
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

router.get(
  '/categories/:id',
  compose([authenticate, authorizeAdmin, isValidFetchCategoryParams]),
  async (ctx) => {
    try {
      const id = ctx.params.id
      const { action, data } = await fetchCategory(id)
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

router.get(
  '/categories',
  compose([authenticate, authorizeAdmin, isValidFetchCategoriesQuery]),
  async (ctx) => {
    try {
      const { page } = ctx.request.query
      const { action, data } = await fetchCategories(page)
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
