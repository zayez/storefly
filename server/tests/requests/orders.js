const { ORDERS, POST_ORDER } = require('../../api/endpointUrls')
const { setHeaders } = require('../helpers/requestHelpers')
const requests = require('../helpers/requestBuilder')(ORDERS)
const agent = requests.agent

const placeOrder = async (order, { token, status }) => {
  const headers = setHeaders(token)
  return await agent
    .post(POST_ORDER)
    .send(order)
    .set(headers)
    .expect('Content-Type', /json/)
    .expect((res) => debugStatus(res, status))
    .expect(status)
    .then((res) => res)
}

module.exports = {
  placeOrder,
  server: requests.server,
}
