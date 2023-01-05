const {
  validateBody,
  validateParams,
  matchUserId,
  validateQuery,
} = require('../validations')
const {
  PlaceOrder,
  GetAllByUser,
  GetOneByUser,
  GetAll,
} = require('./ordersSchema')
const ProductsController = require('../../controllers/products')
const { setResponse } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')
const { isManager } = require('../../helpers/userHelpers')

const validateGetAll = async (ctx, next) =>
  await validateQuery({ ctx, next }, GetAll)

const validateOrder = async (ctx, next) => {
  await validateBody({ ctx, next }, PlaceOrder)
}

const validateGetAllByUser = async (ctx, next) => {
  await validateParams({ ctx, next }, GetAllByUser)
}

const validateAuthorization = async (ctx, next) => {
  if (isManager(ctx.state.user)) {
    await next()
    return
  }
  await matchUserId('userId')(ctx, next)
}

const validateGetOneByUser = async (ctx, next) => {
  await validateParams({ ctx, next }, GetOneByUser)
}

const validateItems = async (ctx, next) => {
  try {
    const items = ctx.request.body.order.items
    const { action, payload } = await ProductsController.validateItems(items)
    if (action !== ActionStatus.Ok) {
      setResponse(ctx, { action, payload })
      return
    }
    await next()
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

module.exports = {
  validateGetAll,
  validateOrder,
  validateItems,
  validateGetAllByUser,
  validateGetOneByUser,
  validateAuthorization,
}
