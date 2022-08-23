const compose = require('koa-compose')
const { authorizeAdmin } = require('../authorization')
const { entityExists, disallowDuplicate } = require('../verify')

const { isValidId } = require('../application/applicationValidation')
const {
  isValidCreate,
  isValidUpdate,
  isValidGetAll,
} = require('./categoriesValidations')

const CategoriesMiddleware = require('./categoriesMiddleware')

const create = compose([
  authorizeAdmin,
  isValidCreate,
  disallowDuplicate('categories', 'title'),
  CategoriesMiddleware.create,
])

const update = compose([
  authorizeAdmin,
  isValidUpdate,
  entityExists('categories'),
  CategoriesMiddleware.update,
])

const destroy = compose([
  authorizeAdmin,
  isValidId,
  CategoriesMiddleware.destroy,
])
const get = compose([authorizeAdmin, isValidId, CategoriesMiddleware.get])
const getAll = compose([
  authorizeAdmin,
  isValidGetAll,
  CategoriesMiddleware.getAll,
])

module.exports = {
  create,
  update,
  destroy,
  get,
  getAll,
}
