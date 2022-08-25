const { format, isFirstDayOfMonth } = require('date-fns')
const knex = require('../db')
const TABLE_NAME = 'orders'
const SELECTABLE_FIELDS = ['id']

const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)

const create = async ({ dateOrder, items }, userId) => {
  const date = format(new Date(), 'yyyy-MM-dd-hh-mm-ss')
  const newOrder = { dateOrder: date, userId }
  const id = await knex('orders').insert(newOrder)
  if (!id) return null

  for (const item of items) {
    const orderItem = await knex('orderItem').insert({ ...item, orderId: id })
    if (!orderItem) return null
  }
  const createdOrder = await findById(id)
  return createdOrder
}

async function findById(id) {
  const order = await knex('orders')
    .select('id', 'dateOrder')
    .where({ id })
    .first()

  if (!order) return null

  order.items = await findItems(id)
  return order
}

const findItems = async (orderId) => {
  const products = await knex('products as p')
    .join('orderItem as i', 'i.productId', 'p.id')
    .join('orders as o', 'o.id', 'i.orderId')
    .select('p.id as id', 'p.title as title', 'i.quantity as quantity')
    .where({ orderId })
  return products
}

const find = async (filters) => {
  const orders = await knex('orders as o')
    .join('orderItem as i', 'i.orderId', 'o.id')
    .join('users as u', 'u.id', 'o.userId')
    .select('o.id as id', 'o.dateOrder as dateOrder')
    .where(filters)

  if (!orders) return null

  for (const order of orders) {
    order.items = await findItems(order.id)
  }

  return orders
}

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries,
  create,
  find,
}
