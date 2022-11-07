const { PRODUCT_STATUSES } = require('../../api/endpointUrls')
const requests = require('../helpers/requestBuilder')(PRODUCT_STATUSES)

module.exports = {
  server: requests.server,
  getAll: requests.getAll,
}
