const { setHeaders, debugStatus } = require('../helpers/requestHelpers')
const { GET_ROOT } = require('../../api/endpointUrls')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)

const getRoot = async (status) => {
  const headers = setHeaders()
  return await agent
    .get(GET_ROOT)
    .set(headers)
    .expect('Content-Type', /json/)
    .expect((res) => debugStatus(res, status))
    .expect(status)
    .then((res) => res)
}

module.exports = {
  getRoot,
}
