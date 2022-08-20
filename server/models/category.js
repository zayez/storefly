const TABLE_NAME = 'categories'
const SELECTABLE_FIELDS = ['id', 'title', 'updatedAt', 'createdAt']

const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries,
}
