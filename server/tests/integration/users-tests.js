const test = require('tape')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')

const { logAdmin, logUser, login } = require('../infrastructure/login')
const { server, create } = require('../requests/users')

test('setup', async (t) => {
  await knex.migrate.latest()
  await knex.seed.run()
  t.end()
})

test('As a user I should:', (t) => {
  t.test('setup', async (assert) => {
    token = await logUser()
    assert.end()
  })

  test('teardown', async (t) => {
    await knex.seed.run()
    t.end()
  })
})

test('As an admin I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    token = await logAdmin()
    assert.end()
  })

  test('teardown', async (t) => {
    t.end()
  })

  t.end()
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})
