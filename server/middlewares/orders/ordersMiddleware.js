const mapper = require('../../helpers/propsMapper').input
const OrdersController = require('../../controllers/orders')
const { setResponse } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')
const { PAYMENT_PAID } = require('../../types/PaymentStatus')

const get = async (ctx) => {
  try {
    const { id } = ctx.params
    const { action, payload } = await OrdersController.getOne(id)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const getAll = async (ctx) => {
  try {
    const { page } = ctx.request.query
    const { action, payload } = await OrdersController.getAll({ page })
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const placeOrder = async (ctx) => {
  try {
    const userId = ctx.state.user.id
    const order = mapper.mapOrder(ctx.request.body.order)
    const shippingAddress = mapper.mapShippingAddress(
      ctx.request.body.shippingAddress,
    )

    // TODO: Add payment status later
    // const { paymentStatus } = ctx.request.body

    const { action, payload } = await OrdersController.placeOrder({
      order,
      shippingAddress,
      userId,
      paymentStatus: PAYMENT_PAID,
    })
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const getAllByUser = async (ctx) => {
  try {
    const { userId } = ctx.params
    const { action, payload } = await OrdersController.getAllByUser(userId)
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const getOneByUser = async (ctx) => {
  try {
    const { orderId, userId } = ctx.params
    const { action, payload } = await OrdersController.getOneByUser({
      orderId,
      userId,
    })
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

module.exports = {
  getAll,
  get,
  placeOrder,
  getAllByUser,
  getOneByUser,
}
