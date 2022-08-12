const test = require('tape')

let knex

test('setup', (t) => {
  knex = require('../../db/connection')

  t.end()
})

test('userRoles tests', (t) => {
  t.test('setup', async (assert) => {
    assert.end()
  })

  t.test('user joedoe should have admin role', async (assert) => {
    const user = await knex('users')
      .select('id')
      .where('email', 'joedoe@google.com')
      .first()
    const userRoles = await knex('roles').whereIn(
      'id',
      knex('userRoles').select('roleId').where('userId', user.id),
    )
    assert.ok(
      userRoles.some((p) => p.name === 'admin'),
      'user has admin role',
    )
  })
  t.end()
})

test('teardown', async (t) => {
  t.end()
})
