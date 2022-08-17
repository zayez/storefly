const Router = require('koa-router')
const compose = require('koa-compose')
const router = new Router()

const { authorizeEditor } = require('../middlewares/authorization')

const { isEditor } = require('../middlewares/verify')
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
    authorizeEditor,
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
  compose([authorizeEditor, isUpdateValid, entityExists('products')]),
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
  compose([authorizeEditor, isDestroyValid]),
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

router.get('/products/:id', compose([isValidGet]), async (ctx) => {
  try {
    const { id } = ctx.params
    const isUserEditor = await isEditor(ctx.state.user)
    const get = isUserEditor ? Products.getOne : Products.getOneActive
    const { action, payload } = await get(id)

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
})

router.get('/products', compose([isValidGetAll]), async (ctx) => {
  try {
    const { page } = ctx.request.query
    const isUserEditor = await isEditor(ctx.state.user)
    const get = isUserEditor ? Products.getAll : Products.getAllActive
    const { action, payload } = await get({ page })
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
})

module.exports = router
