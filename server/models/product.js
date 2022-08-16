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

const queries = require('../helpers/queryHelper')(TABLE_NAME, SELECTABLE_FIELDS)
const ProductStatus = require('../helpers/queryHelper')('productStatus')

const findAllActive = async (pagination) => {
  const activeStatus = await ProductStatus.findOne({ name: PROD_ACTIVE })
  const products = await queries.find({ statusId: activeStatus.id }, pagination)
  return products
}

const findOneActive = async (id) => {
  const statusId = (await ProductStatus.findOne({ name: PROD_ACTIVE })).id
  return await queries.findOne({ id, statusId })
}

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries,
  findAllActive,
  findOneActive,
}
