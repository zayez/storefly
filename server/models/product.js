const knex = require('../db')
const TABLE_NAME = 'products'
const SELECTABLE_FIELDS = [
  'id',
  'title',
  'description',
  'price',
  'inventory',
  'image',
  'statusId',
  'categoryId',
  'updatedAt',
  'createdAt',
]

const { PROD_ACTIVE } = require('../types/ProductStatus')
const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)
const ProductStatus = require('../lib/queryBuilder')('productStatus')

const findAllActive = async (pagination) => {
  const activeStatus = await ProductStatus.findOne({ name: PROD_ACTIVE })
  const products = await queries.find({ statusId: activeStatus.id }, pagination)
  return products
}

const findAllIn = async (ids) => {
  const items = await knex(TABLE_NAME).select('*').whereIn('id', ids)
  return items
}

const findOneActive = async (id) => {
  const statusId = (await ProductStatus.findOne({ name: PROD_ACTIVE })).id
  return await queries.findOne({ id, statusId })
}

const includesAll = async (field, values) => {
  if (!values.length > 0) return false
  const products = await knex(TABLE_NAME).select('id').whereIn(field, values)
  return products.length === values.length
}

const hasInventory = async (items) => {
  for (const item of items) {
    const product = await knex(TABLE_NAME)
      .select('inventory')
      .where('id', item.productId)
      .first()
    if (product.inventory < item.quantity) return false
  }
  return true
}

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries,
  findAllActive,
  findAllIn,
  findOneActive,
  includesAll,
  hasInventory,
}
