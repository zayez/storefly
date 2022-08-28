const {
  setResponse,
  setResponseError,
} = require('../../helpers/middlewareHelpers')
const ProductsController = require('../../controllers/products')
const mapper = require('../../helpers/propsMapper').input
const { isManager } = require('../../helpers/userHelpers')

const create = async (ctx) => {
  try {
    const product = mapper.mapProduct(ctx.request.body)
    if (ctx.request.file) {
      product.image = ctx.request.file.path
    }
    const { action, payload } = await ProductsController.create(product)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const createCollection = async (ctx) => {
  try {
    const products = ctx.request.body.products.map(mapper.mapProduct)
    const { action, payload } = await ProductsController.createCollection(
      products,
    )
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const update = async (ctx) => {
  try {
    const { id } = ctx.params
    const props = mapper.mapProduct(ctx.request.body)
    if (ctx.request.file) {
      props.image = ctx.request.file.path
    }
    const { action, payload } = await ProductsController.update(id, props)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const destroy = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await ProductsController.destroy(id)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const get = async (ctx) => {
  try {
    const { id } = ctx.params
    const get = isManager(ctx.state.user)
      ? ProductsController.getOne
      : ProductsController.getOneActive
    const { action, payload } = await get(id)

    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const getAll = async (ctx) => {
  try {
    const { page } = ctx.request.query
    const get = isManager(ctx.state.user)
      ? ProductsController.getAll
      : ProductsController.getAllActive
    const { action, payload } = await get({ page })
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
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
