const compose = require('koa-compose')
const { authorizeRoles, authorizeAdmin } = require('../authorization')
const upload = require('../../helpers/uploadHelper')
const {
  entityExists,
  disallowDuplicate,
  disallowDuplicates,
} = require('../verify')
const {
  isCreateValid,
  isUploadValid,
  isCreateCollectionValid,
  isUpdateValid,
  isDestroyValid,
  isValidGet,
  isValidGetAll,
} = require('./productsValidation')
const ProductsMiddleware = require('./productsMiddleware')

const authorizeManagers = authorizeRoles(['admin', 'editor'])

const create = compose([
  authorizeManagers,
  upload.single('image'),
  isUploadValid,
  isCreateValid,
  disallowDuplicate('products', 'title'),
  ProductsMiddleware.create,
])

const createCollection = compose([
  authorizeAdmin,
  isCreateCollectionValid,
  disallowDuplicates('products', 'title'),
  ProductsMiddleware.createCollection,
])

const update = compose([
  authorizeManagers,
  isUpdateValid,
  entityExists('products'),
  ProductsMiddleware.update,
])

const destroy = compose([
  authorizeManagers,
  isDestroyValid,
  ProductsMiddleware.destroy,
])

const get = compose([isValidGet, ProductsMiddleware.get])
const getAll = compose([isValidGetAll, ProductsMiddleware.getAll])

module.exports = {
  create,
  createCollection,
  update,
  destroy,
  get,
  getAll,
}
