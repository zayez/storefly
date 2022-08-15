const TABLE_NAME = 'categories'
const SELECTABLE_FIELDS = ['id', 'title', 'updatedAt', 'createdAt']

const queries = require('../helpers/queryHelper')(TABLE_NAME, SELECTABLE_FIELDS)

module.exports = {
  tableName: TABLE_NAME,
  fields: SELECTABLE_FIELDS,
  ...queries,
  // create, // override queries.create
  // update, // override queries.update
}
