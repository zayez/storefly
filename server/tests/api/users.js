const test = require('tape')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)

const { logAdmin, logUser } = require('../infrastructure/login')
const { clearUsers } = require('../../db/queries/users')

let timeStart

test('setup', async (t) => {
  timeStart = new Date().toISOString()
  t.end()
})

test('as a user', (t) => {
  let token

  t.test('setup', async (assert) => {
    token = await logUser()
    assert.end()
  })

  t.test('should be able to sign up', (assert) => {
    agent
      .post(`/signup`)
      .send({
        email: 'zack@apple.com',
        password: '4321',
        firstName: 'zack',
        lastName: 'dug',
      })
      .expect(201)
      .end(function (err, res) {
        const body = res.body
        assert.equal(body.title, 'Created', 'user was created')
        assert.error(err)
        assert.end()
      })
  })
})

test('as an admin', (t) => {
  let token

  t.test('setup', async (assert) => {
    token = await logAdmin()
    assert.end()
  })

  t.end()
})

test('as a customer', (t) => {
  let token

  t.test('setup', async (assert) => {
    token = await logUser()
    assert.end()
  })

  t.test('should be able to sign in', (assert) => {
    agent
      .post(`/signin`)
      .send({
        email: 'zack@apple.com',
        password: '4321',
      })
      .expect(200)
      .end(function (err, res) {
        const body = res.body
        assert.equal(body.title, 'Ok', 'user signed in')
        assert.error(err)
        assert.end()
      })
  })
})

test('teardown', async (t) => {
  await clearUsers(timeStart)
  t.end()
})
