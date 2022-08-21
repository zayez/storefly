const compose = require('koa-compose')
const { authorizeAdmin } = require('../authorization')
const { entityExists, disallowDuplicate } = require('../verify')

const {
  isCreateValid,
  isUpdateValid,
  isDestroyValid,
  isGetValid,
  isGetAllValid,
} = require('./categoriesValidations')

const CategoriesMiddleware = require('./categoriesMiddleware')

const create = compose([
  authorizeAdmin,
  isCreateValid,
  disallowDuplicate('categories', 'title'),
  CategoriesMiddleware.create,
])

const update = compose([
  authorizeAdmin,
  isUpdateValid,
  entityExists('categories'),
  CategoriesMiddleware.update,
])

const destroy = compose([
  authorizeAdmin,
  isDestroyValid,
  CategoriesMiddleware.destroy,
])
const get = compose([authorizeAdmin, isGetValid, CategoriesMiddleware.get])
const getAll = compose([
  authorizeAdmin,
  isGetAllValid,
  CategoriesMiddleware.getAll,
])

module.exports = {
  create,
  update,
  destroy,
  get,
  getAll,
}
