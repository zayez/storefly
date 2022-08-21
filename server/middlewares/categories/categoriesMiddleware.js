const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const CategoriesController = require('../../controllers/categories')

const create = async (ctx) => {
  try {
    const { title } = ctx.request.body
    const category = { title }
    const { action, payload } = await CategoriesController.create(category)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const update = async (ctx) => {
  try {
    const { title } = ctx.request.body
    const category = { title }
    const { id } = ctx.params
    const { action, payload } = await CategoriesController.update(id, category)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const destroy = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await CategoriesController.destroy(id)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const get = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await CategoriesController.getOne(id)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const getAll = async (ctx) => {
  try {
    const { page } = ctx.request.query
    const { action, payload } = await CategoriesController.getAll({ page })
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  create,
  update,
  destroy,
  get,
  getAll,
}
