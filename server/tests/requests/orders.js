const { ORDERS, POST_ORDER, USERS } = require('../../api/endpointUrls')
const { setHeaders, debugStatus } = require('../helpers/requestHelpers')
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

const getByUser = async (userId, { token, status }) => {
  const headers = setHeaders(token)
  return await agent
    .get(`${USERS}/${userId}/orders`)
    .set(headers)
    .expect('Content-Type', /json/)
    .expect((res) => debugStatus(res, status))
    .expect(status)
    .then((res) => res)
}

const getOneByUser = async ({ orderId, userId }, { token, status }) => {
  const headers = setHeaders(token)
  return await agent
    .get(`${USERS}/${userId}/orders/${orderId}`)
    .set(headers)
    .expect('Content-Type', /json/)
    .expect((res) => debugStatus(res, status))
    .expect(status)
    .then((res) => res)
}

module.exports = {
  server: requests.server,
  getAll: requests.getAll,
  placeOrder,
  getByUser,
  getOneByUser,
}
