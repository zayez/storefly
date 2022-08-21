const { setHeaders, debugStatus } = require('../helpers/requestHelpers')
const { USERS } = require('../../api/endpointUrls')
const requests = require('../helpers/requestBuilder')(USERS)
const agent = requests.agent

module.exports = {
  ...requests,
}
