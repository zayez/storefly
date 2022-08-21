const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const ProductsController = require('../../controllers/products')
const { mapProduct } = require('../../helpers/mappings')

const { isAuthorized } = require('../verify')
const isManager = isAuthorized(['admin', 'editor'])

const create = async (ctx) => {
  try {
    const product = mapProduct(ctx.request.body)
    if (ctx.request.file) {
      product.image = ctx.request.file.path
    }
    const { action, payload } = await ProductsController.create(product)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const createCollection = async (ctx) => {
  try {
    const products = ctx.request.body.products.map(mapProduct)
    const { action, payload } = await ProductsController.createCollection(
      products,
    )
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

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
    const { action, payload } = await ProductsController.update(id, product)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const destroy = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await ProductsController.destroy(id)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const get = async (ctx) => {
  try {
    const { id } = ctx.params
    const isUserManager = await isManager(ctx.state.user)
    const get = isUserManager
      ? ProductsController.getOne
      : ProductsController.getOneActive
    const { action, payload } = await get(id)

    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const getAll = async (ctx) => {
  try {
    const { page } = ctx.request.query
    const isUserManager = await isManager(ctx.state.user)
    const get = isUserManager
      ? ProductsController.getAll
      : ProductsController.getAllActive
    const { action, payload } = await get({ page })
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  create,
  createCollection,
  update,
  destroy,
  get,
  getAll,
}
