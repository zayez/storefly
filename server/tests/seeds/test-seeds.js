const roles = require('../../db/seeds/data/roles.json').roles
const productStatuses =
  require('../../db/seeds/data/productStatuses.json').productStatuses
const shippingAddresses = require('../fixtures/shippingAddresses.json')
const admins = require('../fixtures/users.json').admins
const editors = require('../fixtures/users.json').editors
const customers = require('../fixtures/users.json').customers
const categories = require('../fixtures/categories.json').categories
const products = require('../fixtures/products.json').products
const orders = require('../fixtures/orders.json').orders
const User = require('../../models/user')
const Category = require('../../models/category')
const Product = require('../../models/product')
const Order = require('../../models/order')
const { PAYMENT_PAID } = require('../../types/PaymentStatus')

exports.seed = async (knex) => {
  await knex('roles').del()
  await knex('roles').insert(roles)
  await knex('users').del()
  await knex('userRoles').del()

  for (const admin of admins) await User.create(admin, ['admin'])
  for (const editor of editors) await User.create(editor, ['editor'])
  for (const customer of customers) await User.create(customer, ['customer'])

  await knex('categories').del()
  for (const category of categories) {
    await Category.create(category)
  }
  await knex('productStatus').del()
  await knex('productStatus').insert(productStatuses[0])
  await knex('productStatus').insert(productStatuses[1])

  await Product.destroyAll()

  for (const product of products) {
    await Product.create(product)
  }

  await knex('orderItem').del()
  await knex('orders').del()

  await knex('shippingAddresses').del()

  for (const order of orders) {
    const addr = shippingAddresses.find((i) => i.id === order.shippingAddressId)
    order.shippingAddress = mapShippingAddress(addr)
    order.paymentStatus = PAYMENT_PAID
    await Order.create({
      order,
      userId: order.userId,
    })
  }
}

function mapShippingAddress(item) {
  return {
    addressLine1: item.addressLine1,
    addressLine2: item.addressLine2,
    city: item.city,
    country: item.country,
    state: item.state,
    postalCode: item.postalCode,
  }
}
