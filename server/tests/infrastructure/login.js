const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)

async function logAdmin() {
  const res = await agent
    .post('/signin')
    .send({ email: 'joedoe@google.com', password: '1234' })

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
