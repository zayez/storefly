const { format, isFirstDayOfMonth } = require('date-fns')
const knex = require('../db')
const TABLE_NAME = 'orders'
const SELECTABLE_FIELDS = ['id']
const { ITEMS_PER_PAGE } = require('../config').app
const { SHIPPING_UNSHIPPED } = require('../types/ShippingStatus')

const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)

const create = async ({ order, shippingAddress, userId, paymentStatus }) => {
  const paymentStatusSelected = await knex('paymentStatus')
    .select('id')
    .where('name', paymentStatus.toString())
    .first()
  const paymentStatusId = paymentStatusSelected.id

  const shippingStatus = await knex('shippingStatus')
    .select('id')
    .where('name', SHIPPING_UNSHIPPED)
    .first()

  if (!shippingStatus) return null

  const shippingStatusId = shippingStatus.id

  const addressFound = await knex('shippingAddresses')
    .select('id')
    .where(shippingAddress)
    .first()

  let shippingAddressId

  if (addressFound) {
    shippingAddressId = addressFound.id
  } else {
    shippingAddressId = await knex('shippingAddresses').insert(shippingAddress)
  }

  const { dateOrder, subtotal, total, items } = order

  const dateFormat = 'yyyy-MM-dd-hh-mm-ss'
  const date = dateOrder ? dateOrder : format(new Date(), dateFormat)

  const newOrder = {
    subtotal,
    total,
    dateOrder: date,
    userId,
    paymentStatusId,
    shippingStatusId,
    shippingAddressId,
  }

  const id = await knex('orders').insert(newOrder)

  if (!id) return null

  for (const item of items) {
    const orderItem = await knex('orderItem').insert({ ...item, orderId: id })
    if (!orderItem) return null
  }
  const createdOrder = await findById(id)
  return createdOrder
}

const queryOrders = knex('orders as o')
  .distinct()
  .join('orderItem as i', 'i.orderId', 'o.id')
  .select('o.id as id', 'o.dateOrder as dateOrder', 'o.userId as userId')

const queryOrderItems = knex('products as p')
  .join('orderItem as i', 'i.productId', 'p.id')
  .join('orders as o', 'o.id', 'i.orderId')
  .select('p.id as id', 'p.title as title', 'i.quantity as quantity')

const findById = async (id) => {
  const order = await queryOrders.clone().where('o.id', id).first()

  if (!order) return null

  order.items = await findItems(id)
  return order
}

const findItems = async (orderId) => {
  const products = await queryOrderItems.clone().where(`o.id`, orderId)
  return products
}

const find = async (filters, { page = 1, perPage = ITEMS_PER_PAGE } = {}) => {
  const ordersPaginated = await queryOrders
    .clone()
    .where(filters)
    .paginate({ perPage, currentPage: page })

  const orders = ordersPaginated.data

  if (!orders) return null

  for (const order of orders) {
    order.items = await findItems(order.id)
  }

  return orders
}

const findAll = async (pagination = {}) => await find({}, pagination)

const findOneByUser = async ({ orderId, userId }) => {
  const order = await queryOrders
    .clone()
    .where('o.id', '=', orderId)
    .andWhere('o.userId', '=', userId)
    .first()

  if (!order) return null

  order.items = await findItems(order.id)
  return order
}

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries,
  create,
  find,
  findAll,
  findOneByUser,
  findById,
}
