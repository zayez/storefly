const compose = require('koa-compose')

const { authorizeRoles, authorizeAdmin } = require('../authorization')
const { isAuthorized } = require('../verify')
const upload = require('../../helpers/uploadHelper')

const {
  entityExists,
  disallowDuplicate,
  disallowDuplicates,
} = require('../verify')

const authorizeManagers = authorizeRoles(['admin', 'editor'])
const isManager = isAuthorized(['admin', 'editor'])

const { mapProduct } = require('../../helpers/mappings')
const { setBody, setBodyError } = require('../../helpers/routeHelpers')
const Products = require('../../controllers/products')

const {
  isCreateValid,
  isUploadValid,
  isCreateCollectionValid,
  isUpdateValid,
  isDestroyValid,
  isValidGet,
  isValidGetAll,
} = require('./productsValidation')

const create = async (ctx) => {
  try {
    const product = mapProduct(ctx.request.body)
    if (ctx.request.file) {
      product.image = ctx.request.file.path
    }
    const { action, payload } = await Products.create(product)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineCreate = compose([
  authorizeManagers,
  upload.single('image'),
  isUpdateValid,
  isCreateValid,
  disallowDuplicate('products', 'title'),
  create,
])

const createCollection = async (ctx) => {
  try {
    const products = ctx.request.body.products.map(mapProduct)
    const { action, payload } = await Products.createCollection(products)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineCreateCollection = compose([
  authorizeAdmin,
  isCreateCollectionValid,
  disallowDuplicates('products', 'title'),
  createCollection,
])

const update = async (ctx) => {
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
}

const pipelineUpdate = compose([
  authorizeManagers,
  isUpdateValid,
  entityExists('products'),
  update,
])

const destroy = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await Products.destroy(id)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineDestroy = compose([authorizeManagers, isDestroyValid, destroy])

const get = async (ctx) => {
  try {
    const { id } = ctx.params
    const isUserManager = await isManager(ctx.state.user)
    const get = isUserManager ? Products.getOne : Products.getOneActive
    const { action, payload } = await get(id)

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineGet = compose([isValidGet, get])

const getAll = async (ctx) => {
  try {
    const { page } = ctx.request.query
    const isUserManager = await isManager(ctx.state.user)
    const get = isUserManager ? Products.getAll : Products.getAllActive
    const { action, payload } = await get({ page })
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineGetAll = compose([isValidGetAll, getAll])

module.exports = {
  create: pipelineCreate,
  createCollection: pipelineCreateCollection,
  update: pipelineUpdate,
  destroy: pipelineDestroy,
  get: pipelineGet,
  getAll: pipelineGetAll,
}
