const { format } = require('date-fns')

const knex = require('../db')
const TABLE_NAME = 'orders'
const SELECTABLE_FIELDS = ['id']
const { ITEMS_PER_PAGE } = require('../config').app
const { SHIPPING_UNSHIPPED } = require('../types/ShippingStatus')

const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)

/**
 * Creates an order based on stripe webhook that includes total and subtotal.
 * @param {order} order order to create
 * @param {int} userId order's user
 * @returns
 */
const createForStripe = async ({ order, userId }) => {
  const { dateOrder, subtotal, total, items, paymentStatus, shippingAddress } =
    order

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

  //TODO: Try to use the best format
  // const dateFormat = 'yyyy-MM-dd-hh-mm-ss'
  // const date = dateOrder ? dateOrder : format(new Date(), dateFormat)
  const date = dateOrder ? dateOrder : new Date()

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

/**
 * Creates an order calculating total and subtotal.
 * @param {order} order order to create
 * @param {int} userId order's user
 * @returns
 */
const create = async ({ order, userId }) => {
  const { dateOrder, items, paymentStatus, shippingAddress } = order

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

  //TODO: Try to use the best format
  // const dateFormat = 'yyyy-MM-dd-hh-mm-ss'
  // const date = dateOrder ? dateOrder : format(new Date(), dateFormat)
  const date = dateOrder ? dateOrder : new Date()

  const itemsAcc = await Promise.all(
    items.map(async (i) => {
      const product = await knex('products')
        .select('*')
        .where('id', i.productId)
        .first()
      if (!product) return null

      const total = i.quantity * product.price
      return { ...i, price: product.price, total, subtotal: total }
    }),
  )

  const total = itemsAcc.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
  const subtotal = total

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

  for (const item of itemsAcc) {
    const orderItem = await knex('orderItem').insert({ ...item, orderId: id })
    if (!orderItem) return null
  }
  const createdOrder = await findById(id)
  return createdOrder
}

const queryOrders = knex('orders as o')
  .distinct()
  .join('orderItem as i', 'i.orderId', 'o.id')
  .leftJoin('users as u', 'u.id', 'o.userId')
  .join('paymentStatus as ps', 'ps.id', 'o.paymentStatusId')
  .join('shippingStatus as ss', 'ss.id', 'o.shippingStatusId')
  .select(
    'o.id as id',
    'o.dateOrder as dateOrder',
    'o.userId as userId',
    'o.total as total',
    'u.firstName as firstName',
    'u.lastName as lastName',
    'ps.name as paymentStatus',
    'ss.name as shippingStatus',
  )

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
    order.customer = {
      firstName: order.firstName,
      lastName: order.lastName,
    }
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
  createForStripe,
  find,
  findAll,
  findOneByUser,
  findById,
}
