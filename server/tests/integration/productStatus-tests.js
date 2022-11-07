const test = require('tape')
const { faker } = require('@faker-js/faker')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { login } = require('../infrastructure/login')
const editors = require('../fixtures/users.json').editors

const { server, getAll } = require('../requests/productStatuses')

test('setup', async (t) => {
  t.end()
})

test('As editor I should:', (t) => {
  let token
  let editor = editors[0]

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })
    token = await login(editor.email, editor.password)
    assert.end()
  })

  t.test('be able to retrieve all product statuses', async (assert) => {
    const allProductStatuses = await knex('productStatus')
    const res = await getAll({ token, status: STATUS.Ok })
    const resProdStatuses = res.body
    assert.ok(Array.isArray(resProdStatuses))
    assert.equal(resProdStatuses.length, allProductStatuses.length)
    assert.equal(resProdStatuses[0].name, 'draft')
    assert.equal(resProdStatuses[1].name, 'active')
    assert.end()
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
