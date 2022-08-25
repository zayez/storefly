const { validateBody } = require('../validations')
const { PlaceOrder } = require('./ordersSchema')
const ProductsController = require('../../controllers/products')
const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')

const validateOrder = async (ctx, next) => {
  await validateBody({ ctx, next }, PlaceOrder)
}

const validateItems = async (ctx, next) => {
  try {
    const items = ctx.request.body.items
    const { action, payload } = await ProductsController.validateItems(items)
    if (action !== ActionStatus.Ok) {
      setBody({ ctx, action, payload })
      return
    }
    await next()
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  validateOrder,
  validateItems,
}
