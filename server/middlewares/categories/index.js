const compose = require('koa-compose')
const { authorizeAdmin } = require('../authorization')
const { entityExists, disallowDuplicate } = require('../verify')
const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const Categories = require('../../controllers/categories')
const {
  isCreateValid,
  isUpdateValid,
  isDestroyValid,
  isGetValid,
  isGetAllValid,
} = require('./categoriesValidations')

const create = async (ctx) => {
  try {
    const { title } = ctx.request.body
    const category = { title }
    const { action, payload } = await Categories.create(category)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineCreate = compose([
  authorizeAdmin,
  isCreateValid,
  disallowDuplicate('categories', 'title'),
  create,
])

const update = async (ctx) => {
  try {
    const { title } = ctx.request.body
    const category = { title }
    const { id } = ctx.params
    const { action, payload } = await Categories.update(id, category)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineUpdate = compose([
  authorizeAdmin,
  isUpdateValid,
  entityExists('categories'),
  update,
])

const destroy = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await Categories.destroy(id)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineDestroy = compose([authorizeAdmin, isDestroyValid, destroy])

const get = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await Categories.getOne(id)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineGet = compose([authorizeAdmin, isGetValid, get])

const getAll = async (ctx) => {
  try {
    const { page } = ctx.request.query
    const { action, payload } = await Categories.getAll({ page })
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineGetAll = compose([authorizeAdmin, isGetAllValid, getAll])

module.exports = {
  create: pipelineCreate,
  update: pipelineUpdate,
  destroy: pipelineDestroy,
  get: pipelineGet,
  getAll: pipelineGetAll,
}
