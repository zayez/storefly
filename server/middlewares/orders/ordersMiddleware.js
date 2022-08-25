const mapper = require('../../helpers/propsMapper').input
const OrdersController = require('../../controllers/orders')
const { setBodyError, setBody } = require('../../helpers/middlewareHelpers')
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

module.exports = { placeOrder }