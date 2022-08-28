const {
  setResponse,
  setResponseError,
} = require('../../helpers/middlewareHelpers')
const CategoriesController = require('../../controllers/categories')
const mapper = require('../../helpers/propsMapper').input

const create = async (ctx) => {
  try {
    const props = mapper.mapCategory(ctx.request.body)
    const { action, payload } = await CategoriesController.create(props)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const update = async (ctx) => {
  try {
    const props = mapper.mapCategory(ctx.request.body)
    const { id } = ctx.params
    const { action, payload } = await CategoriesController.update(id, props)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const destroy = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await CategoriesController.destroy(id)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const get = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await CategoriesController.getOne(id)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

const getAll = async (ctx) => {
  try {
    const { page } = ctx.request.query
    const { action, payload } = await CategoriesController.getAll({ page })
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponseError(ctx, { error: err })
  }
}

module.exports = {
  create,
  update,
  destroy,
  get,
  getAll,
}
