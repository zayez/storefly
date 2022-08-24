const compose = require('koa-compose')
const { authorizeAdmin, authorizeManagers } = require('../authorization')
const upload = require('../../helpers/uploadHelper')
const { disallowDuplicates } = require('../verify')
const {
  validateCreate,
  validateUpdate,
  validateCreateCollection,
  validateGetAll,
  validateUpload,
} = require('./productsValidation')

const { isValidId } = require('../application/applicationValidation')
const ProductsMiddleware = require('./productsMiddleware')

const create = compose([
  authorizeManagers,
  upload.single('image'),
  validateUpload,
  validateCreate,
  ProductsMiddleware.create,
])

const update = compose([
  authorizeManagers,
  upload.single('image'),
  validateUpload,
  validateUpdate,
  ProductsMiddleware.update,
])

const createCollection = compose([
  authorizeAdmin,
  validateCreateCollection,
  disallowDuplicates('products', 'title'),
  ProductsMiddleware.createCollection,
])

const destroy = compose([
  authorizeManagers,
  isValidId,
  ProductsMiddleware.destroy,
])

const get = compose([isValidId, ProductsMiddleware.get])
const getAll = compose([validateGetAll, ProductsMiddleware.getAll])

module.exports = {
  create,
  createCollection,
  update,
  destroy,
  get,
  getAll,
}
