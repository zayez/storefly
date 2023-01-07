const { setResponse } = require('../../helpers/middlewareHelpers')
const ActionStatus = require('../../types/ActionStatus')
const { ORDER_STRIPE } = require('../../types/OrderType')
const OrdersController = require('../../controllers/orders')
const STRIPE_KEY = require('../../config').stripe.KEY
const STRIPE_CLI_KEY = require('../../config').stripe.CLI_KEY

const stripe = require('stripe')(STRIPE_KEY)
const { PAYMENT_PAID, PAYMENT_UNPAID } = require('../../types/PaymentStatus')

const create = async (ctx) => {
  let event
  try {
    const sig = ctx.request.headers['stripe-signature']
    const body = ctx.request.rawBody

    event = stripe.webhooks.constructEvent(body, sig, STRIPE_CLI_KEY)

    const session = event.data.object
    const eventType = event.type

    if (eventType === 'checkout.session.completed') {
      const { amount_total, amount_subtotal, payment_status } = session
      const paymentStatus =
        payment_status === PAYMENT_PAID ? PAYMENT_PAID : PAYMENT_UNPAID
      const customerId = session.customer
      const address = session.customer_details.address
      const shippingAddress = {
        addressLine1: address.line1,
        addressLine2: address.line2,
        city: address.city,
        country: address.country,
        state: address.state,
        postalCode: address.postal_code,
      }
      const { line_items } = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ['line_items', 'line_items.data.price.product'],
        },
      )
      const items = line_items.data.map(mapLineItems)

      const customer = await stripe.customers.retrieve(session.customer)
      const { userId } = customer.metadata
      const order = {
        total: amount_total / 100,
        subtotal: amount_subtotal / 100,
        shippingAddress,
        paymentStatus,
      }
      order.items = items
      const { action, payload } = await OrdersController.placeOrder(
        {
          order,
          userId,
        },
        ORDER_STRIPE,
      )
      setResponse(ctx, { action, payload })
    }
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

function mapLineItems(i) {
  return {
    subtotal: i.amount_subtotal / 100,
    total: i.amount_total / 100,
    price: i.price.unit_amount / 100,
    quantity: i.quantity,
    productId: i.price.product.metadata.productId,
  }
}

module.exports = { create }
