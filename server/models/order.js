const knex = require('../db')
const TABLE_NAME = 'orders'
const SELECTABLE_FIELDS = ['id']

const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)

const create = async (order, userId) => {
  const newOrder = { userId }
  const id = await knex('orders').insert(newOrder)
  if (!id) return null

  for (item of order.items) {
    const orderItem = await knex('orderItem').insert({ ...item, orderId: id })
    if (!orderItem) return null
  }
  const createdOrder = await queries.findById(id)
  return createdOrder
}

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries,
  create,
}
