const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const admin = require('../fixtures/users.json').admins[0]
const editor = require('../fixtures/users.json').editors[0]
const customer = require('../fixtures/users.json').customers[0]
const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config').jwt

function decodeToken(token) {
  const decodedToken = jwt.verify(token, SECRET)
  return decodedToken.sub
}

async function logAdmin() {
  const res = await agent
    .post('/signin')
    .send({ email: admin.email, password: admin.password })

  const newToken = res.body.token
  return newToken
}

async function logEditor() {
  const res = await agent
    .post('/signin')
    .send({ email: editor.email, password: editor.password })

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

async function login(email, password) {
  const res = await agent
    .post('/signin')
    .send({ email: email, password: password })

  const newToken = res.body.token
  return newToken
}

module.exports = {
  logAdmin,
  logEditor,
  logUser,
  login,
  decodeToken,
}
