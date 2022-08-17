const Router = require('koa-router')
const compose = require('koa-compose')
const router = new Router()

const {
  authorizeRoles,
  authorizeAdmin,
} = require('../middlewares/authorization')
const { isAuthorized } = require('../middlewares/verify')
const { mapProduct } = require('../helpers/mappings')

const authorizeManagers = authorizeRoles(['admin', 'editor'])
const isManager = isAuthorized(['admin', 'editor'])

const {
  isCreateValid,
  isCreateCollectionValid,
  isUpdateValid,
  isDestroyValid,
  isValidGet,
  isValidGetAll,
} = require('../middlewares/validations/product')

const { setBody, setBodyError } = require('../helpers/routeHelpers')
const Products = require('../controllers/products')

const {
  entityExists,
  disallowDuplicate,
  disallowDuplicates,
} = require('../middlewares/verify')

router.post(
  '/products',
  compose([
    authorizeManagers,
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

router.post(
  '/products/collections',
  compose([
    authorizeAdmin,
    isCreateCollectionValid,
    disallowDuplicates('products', 'title'),
  ]),
  async (ctx) => {
    try {
      const products = ctx.request.body.products.map(mapProduct)
      const { action, payload } = await Products.createCollection(products)
      setBody({ ctx, action, payload })
    } catch (err) {
      setBodyError(ctx, err)
    }
  },
)

router.patch(
  '/products/:id',
  compose([authorizeManagers, isUpdateValid, entityExists('products')]),
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
  compose([authorizeManagers, isDestroyValid]),
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
    const isUserManager = await isManager(ctx.state.user)
    const get = isUserManager ? Products.getOne : Products.getOneActive
    const { action, payload } = await get(id)

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
})

router.get('/products', compose([isValidGetAll]), async (ctx) => {
  try {
    const { page } = ctx.request.query
    const isUserManager = await isManager(ctx.state.user)
    const get = isUserManager ? Products.getAll : Products.getAllActive
    const { action, payload } = await get({ page })
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
})

module.exports = router
