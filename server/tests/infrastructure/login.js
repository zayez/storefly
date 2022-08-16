const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const admin = require('../fixtures/users.json').admins[0]
const customer = require('../fixtures/users.json').customers[0]

async function logAdmin() {
  const res = await agent
    .post('/signin')
    .send({ email: admin.email, password: admin.password })

  const newToken = res.body.token
  return newToken
}

async function logUser() {
  const res = await agent
    .post('/signin')
    .send({ email: customer.email, password: customer.password })

  const newToken = res.body.token
  return newToken
}

module.exports = {
  logAdmin,
  logUser,
}
