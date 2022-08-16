const path = require('path')
const controllerName = path.parse(__filename).name
const controller = require('../helpers/controllerHelper')(controllerName)
const { mapProducts } = require('../helpers/mappings')
const Product = require('../models/product')
const ActionStatus = require('../types/ActionStatus')

const getAllActive = async (pagination) => {
  try {
    const productsFound = await Product.findAllActive(pagination)
    if (productsFound) {
      const products = mapProducts(productsFound)
      return {
        action: ActionStatus.Ok,
        payload: { products },
      }
    } else {
      return {
        action: ActionStatus.BadRequest,
        payload: null,
      }
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  ...controller,
  getAllActive,
}
