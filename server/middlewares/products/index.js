const compose = require('koa-compose')
const { authorizeAdmin, authorizeManagers } = require('../authorization')
const upload = require('../../helpers/uploadHelper')
const {
  entityExists,
  disallowDuplicate,
  disallowDuplicates,
} = require('../verify')
const {
  isValidCreate,
  isValidUpload,
  isValidCreateCollection,
  isValidUpdate,
  isValidGetAll,
} = require('./productsValidation')

const { isValidId } = require('../application/applicationValidation')
const ProductsMiddleware = require('./productsMiddleware')

const create = compose([
  authorizeManagers,
  upload.single('image'),
  isValidUpload,
  isValidCreate,
  disallowDuplicate('products', 'title'),
  ProductsMiddleware.create,
])

const createCollection = compose([
  authorizeAdmin,
  isValidCreateCollection,
  disallowDuplicates('products', 'title'),
  ProductsMiddleware.createCollection,
])

const update = compose([
  authorizeManagers,
  isValidUpdate,
  entityExists('products'),
  ProductsMiddleware.update,
])

const destroy = compose([
  authorizeManagers,
  isValidId,
  ProductsMiddleware.destroy,
])

const get = compose([isValidId, ProductsMiddleware.get])
const getAll = compose([isValidGetAll, ProductsMiddleware.getAll])

module.exports = {
  create,
  createCollection,
  update,
  destroy,
  get,
  getAll,
}
