const { setResponse } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')
const StripeCheckoutController = require('../../controllers/stripeCheckout')

const create = async (ctx) => {
  try {
    const { items } = ctx.request.body
    // console.log(ctx.request.body)
    const { action, payload } = await StripeCheckoutController.create(items)
    setResponse(ctx, { action, payload })
  } catch (err) {
    console.log(err)
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

const get = async (ctx) => {
  try {
    const { id } = ctx.query
    if (id) {
      const { action, payload } = await StripeCheckoutController.get(id)
      setResponse(ctx, { action, payload })
    }
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

module.exports = { create, get }
