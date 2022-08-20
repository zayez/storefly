module.exports = (tableName, selectableFields = '*') => {
  const queries = require('../lib/queryBuilder')(tableName, selectableFields)

  return {
    ...queries,
  }
}
