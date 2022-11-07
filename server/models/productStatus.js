const TABLE_NAME = 'productStatus'
const SELECTABLE_FIELDS = ['id', 'name', 'updatedAt', 'createdAt']

const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)

module.exports = {
  findAll: queries.findAll,
}
