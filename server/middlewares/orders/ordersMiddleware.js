const mapper = require('../../helpers/propsMapper').input
const OrdersController = require('../../controllers/orders')
const { setBodyError, setBody } = require('../../helpers/middlewareHelpers')

const get = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await OrdersController.getOne(id)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const getAll = async (ctx) => {
  try {
    const { page } = ctx.request.query
    const { action, payload } = await OrdersController.getAll({ page })
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const placeOrder = async (ctx) => {
  try {
    const userId = ctx.state.user.id
    const order = mapper.mapOrder(ctx.request.body)
    const { action, payload } = await OrdersController.placeOrder(order, userId)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const getAllByUser = async (ctx) => {
  try {
    const { userId } = ctx.params
    const { action, payload } = await OrdersController.getAllByUser(userId)
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const getOneByUser = async (ctx) => {
  try {
    const { orderId, userId } = ctx.params
    const { action, payload } = await OrdersController.getOneByUser({
      orderId,
      userId,
    })
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = { getAll, get, placeOrder, getAllByUser, getOneByUser }
