const test = require('tape')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')

const { logAdmin, logUser } = require('../infrastructure/login')

test('setup', async (t) => {
  t.end()
})

test('[header] title', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run()

    token = await logAdmin()
    assert.end()
  })

  t.test('should be able to create an item', (assert) => {
    agent
      .post(`/items`)
      .send({
        title: 'title',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        assert.equal(res.body.title, 'Created', 'Item created')
        assert.equal(res.body.item.title, 'title')
        assert.end()
      })
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })

  t.end()
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})
