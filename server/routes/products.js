const Router = require('koa-router')
const compose = require('koa-compose')
const router = new Router()

const { authenticate } = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorization').isAdmin
const {
  isCreateValid,
  isUpdateValid,
  isDestroyValid,
  isValidGet,
  isValidGetAll,
} = require('../middlewares/validations/product')

const { setBody, setBodyError } = require('../helpers/routeHelpers')
const Products = require('../controllers/products')

const { entityExists, disallowDuplicate } = require('../middlewares/verify')

router.post(
  '/products',
  compose([
    authenticate,
    authorizeAdmin,
    isCreateValid,
    disallowDuplicate('products', 'title'),
  ]),
  async (ctx) => {
    try {
      const product = ({
        title,
        description,
        price,
        inventory,
        image,
        statusId,
        categoryId,
      } = ctx.request.body)
      const { action, payload } = await Products.create(product)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.patch(
  '/products/:id',
  compose([
    authenticate,
    authorizeAdmin,
    isUpdateValid,
    entityExists('products'),
  ]),
  async (ctx) => {
    try {
      const product = ({
        title,
        description,
        price,
        inventory,
        image,
        statusId,
        categoryId,
      } = ctx.request.body)
      const { id } = ctx.params
      const { action, payload } = await Products.update(id, product)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.delete(
  '/products/:id',
  compose([authenticate, authorizeAdmin, isDestroyValid]),
  async (ctx) => {
    try {
      const { id } = ctx.params
      const { action, payload } = await Products.destroy(id)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.get(
  '/products/:id',
  compose([authenticate, authorizeAdmin, isValidGet]),
  async (ctx) => {
    try {
      const { id } = ctx.params
      const { action, payload } = await Products.getOne(id)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.get(
  '/products',
  compose([authenticate, authorizeAdmin, isValidGetAll]),
  async (ctx) => {
    try {
      const { page } = ctx.request.query
      const { action, payload } = await Products.getAll(page)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

module.exports = router
