const path = require('path')
const controllerName = path.parse(__filename).name
const controller = require('../helpers/controllerHelper')(controllerName)
const { mapProduct, mapProducts } = require('../helpers/mappings')
const Product = require('../models/product')
const ActionStatus = require('../types/ActionStatus')

const createCollection = async (products) => {
  try {
    // lastProduct is the last item created (for now)
    const lastProduct = await Product.create(products)
    if (lastProduct) {
      return {
        action: ActionStatus.Created,
        payload: { lastProduct: mapProduct(lastProduct) },
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
      const products = mapProducts(productsFound)
      return {
        action: ActionStatus.Ok,
        payload: { products },
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
      const product = mapProduct(productFound)
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
  createCollection,
  getAllActive,
  getOneActive,
}
