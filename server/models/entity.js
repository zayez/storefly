module.exports = (tableName, selectableFields = '*') => {
  const queries = require('../helpers/queryHelper')(tableName, selectableFields)

  return {
    ...queries,
  }
}
