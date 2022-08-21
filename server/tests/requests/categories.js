const { CATEGORIES } = require('../../api/endpointUrls')
const requests = require('../helpers/requestBuilder')(CATEGORIES)

module.exports = {
  ...requests,
}
