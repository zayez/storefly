const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config').jwt

async function login(email, password) {
  const res = await agent
    .post('/signin')
    .send({ email: email, password: password })

  const newToken = res.body.token
  return newToken
}

function decodeToken(token) {
  const decodedToken = jwt.verify(token, SECRET)
  return decodedToken.sub
}

module.exports = {
  login,
  decodeToken,
}
