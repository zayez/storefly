const { setResponse } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')
const OrdersController = require('../../controllers/orders')
const STRIPE_KEY = require('../../config').stripe.KEY
const stripe = require('stripe')(STRIPE_KEY)
const { PAYMENT_PAID, PAYMENT_UNPAID } = require('../../types/PaymentStatus')

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  'whsec_9c671269f1c31afa3e3e73e1c3559d2cf2b033d568bc3cc42cb5422e6e9d1776'

const create = async (ctx) => {
  let event
  try {
    const sig = ctx.request.headers['stripe-signature']

    event = stripe.webhooks.constructEvent(
      ctx.request.rawBody,
      sig,
      endpointSecret,
    )

    const session = event.data.object
    const eventType = event.type

    if (eventType === 'checkout.session.completed') {
      const { amount_total, amount_subtotal, payment_status } = session
      const PAYMENT_STATUS =
        payment_status === PAYMENT_PAID ? PAYMENT_PAID : PAYMENT_UNPAID
      const customerId = session.customer
      // data.customer_details -> address, email, name, phone
      const { line_items } = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ['line_items', 'line_items.data.price.product'],
        },
      )
      const items = line_items.data.map((i) => {
        return {
          subtotal: i.amount_subtotal / 100,
          total: i.amount_total / 100,
          price: i.price.unit_amount / 100,
          quantity: i.quantity,
          productId: i.price.product.metadata.productId,
        }
      })

      const customer = await stripe.customers.retrieve(session.customer)
      const { userId } = customer.metadata
      const order = {
        total: amount_total / 100,
        subtotal: amount_subtotal / 100,
      }
      order.items = items
      const { action, payload } = await OrdersController.placeOrder({
        order,
        userId,
        paymentStatus: PAYMENT_STATUS,
      })
      setResponse(ctx, { action, payload })
    }
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

module.exports = { create }
