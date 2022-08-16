const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const users = require('../fixtures/users.json').users

async function logAdmin() {
  const res = await agent
    .post('/signin')
    .send({ email: users[0].email, password: users[0].password })

  const newToken = res.body.token
  return newToken
}

async function logUser() {
  const res = await agent
    .post('/signin')
    .send({ username: 'cli1', password: 'cli1' })

  const newToken = res.body.token
  return newToken
}

module.exports = {
  logAdmin,
  logUser,
}
