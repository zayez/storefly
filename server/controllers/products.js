const path = require('path')
const controllerName = path.parse(__filename).name
const controller = require('../helpers/controllerHelper')(controllerName)
const mapper = require('../helpers/propsMapper').output
const Product = require('../models/product')
const ActionStatus = require('../types/ActionStatus')
const { deleteFile } = require('../helpers/fsHelper')

const update = async (id, props = {}) => {
  try {
    if (props.image) {
      const product = await Product.findById(id)
      await deleteFile(product.image)
    }
    const updatedProduct = await Product.update(id, props)
    if (updatedProduct) {
      const payload = {}
      payload.product = mapper.mapProduct(updatedProduct)
      return {
        action: ActionStatus.Ok,
        payload,
      }
    }
    return {
      action: ActionStatus.BadRequest,
      payload: null,
    }
  } catch (err) {
    throw err
  }
}

const createCollection = async (products) => {
  try {
    // lastProduct is the last item created (for now)
    const lastProduct = await Product.create(products)
    if (lastProduct) {
      return {
        action: ActionStatus.Created,
        payload: { lastProduct: mapper.mapProduct(lastProduct) },
      }
    }
    return {
      action: ActionStatus.Unprocessable,
      payload: null,
    }
  } catch (err) {
    throw err
  }
}

const getAllActive = async (pagination) => {
  try {
    const productsFound = await Product.findAllActive(pagination)
    if (productsFound) {
      return {
        action: ActionStatus.Ok,
        payload: { products: productsFound.map(mapper.mapProduct) },
      }
    }
    return {
      action: ActionStatus.NotFound,
      payload: null,
    }
  } catch (err) {
    throw err
  }
}

const getOneActive = async (id) => {
  try {
    const productFound = await Product.findOneActive(id)
    if (productFound) {
      const product = mapper.mapProduct(productFound)
      return {
        action: ActionStatus.Ok,
        payload: { product },
      }
    }
    return {
      action: ActionStatus.NotFound,
      payload: null,
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  ...controller,
  update,
  createCollection,
  getAllActive,
  getOneActive,
}
