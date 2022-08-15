const test = require('tape')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const knex = require('../../db')

const { logAdmin, logUser } = require('../infrastructure/login')

test('setup', async (t) => {
  await knex.migrate.latest()
  await knex.seed.run()
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
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        assert.equal(res.body.title, 'Created', 'User was created')
        assert.ok(res.body instanceof Object && res.body.constructor === Object)
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
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.equal(res.body.title, 'Ok', 'user signed in')
        assert.notEqual(res.body.token, '', 'token is not empty')
        assert.end()
      })
  })
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})
