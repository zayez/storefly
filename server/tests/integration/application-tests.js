const test = require('tape')
const server = require('../../server')
const STATUS = require('../../types/StatusCode')

const { getRoot } = require('../requests/application')

test('setup', async (t) => {
  t.end()
})

test('As a user I should:', (t) => {
  t.test('setup', async (assert) => {
    assert.end()
  })

  t.test('be able to access root endpoint', async (assert) => {
    const res = await getRoot(STATUS.Ok)
    assert.equal(res.body.greeting, 'hella!')
    assert.end()
  })

  test('teardown', async (t) => {
    t.end()
  })
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})
