const ActionStatus = require('../types/ActionStatus')
const CLIENT_URL = require('../config').CLIENT_URL
const STRIPE_KEY = require('../config').stripe.KEY
const stripe = require('stripe')(STRIPE_KEY)
const Product = require('../models/product')
const isEqual = require('lodash/isEqual')
const create = async (items) => {
  try {
    const products = await Product.findAllIn(items.map((i) => i.id))
    const productsIds = products.map((i) => i.id)
    const itemsIds = items.map((i) => i.id)
    if (!isEqual(productsIds, itemsIds)) {
      return { action: ActionStatus.BadRequest }
    }

    const line_items = items.map((item) => {
      const product = products.find((p) => p.id === item.id)
      return {
        price_data: {
          currency: 'usd',
          product_data: { name: product.title },
          unit_amount: product.price * 100,
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `http://${CLIENT_URL}/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://${CLIENT_URL}/cart?id={CHECKOUT_SESSION_ID}`,
    })

    return { action: ActionStatus.Ok, payload: { url: session.url } }
  } catch (err) {
    throw err
  }
}

const get = async (id) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['line_items'],
    })
    return { action: ActionStatus.Ok, payload: session }
  } catch (err) {
    throw err
  }
}

module.exports = {
  create,
  get,
}
