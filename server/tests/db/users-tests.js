const test = require('tape')
const {
  userHasRole,
  findUserByEmail,
  matchPassword,
} = require('../../models/user')
let knex

test('setup', (t) => {
  knex = require('../../db')

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
    assert.ok(await userHasRole(user, 'admin'), 'user has admin role')
  })
  t.end()
})

test('find user', (t) => {
  t.test('setup', async (assert) => {
    assert.end()
  })

  t.test('should find user joe doe', async (assert) => {
    const user = await findUserByEmail('joedoe@google.com')
    assert.equal(user.firstName, 'Joe')
  })
  t.end()
})

test('password', (t) => {
  t.test('setup', async (assert) => {
    assert.end()
  })

  t.test('password should be a match', async (assert) => {
    const isPasswordMatch = await matchPassword('joedoe@google.com', '1234')
    assert.ok(isPasswordMatch, 'password is a match')
  })

  t.test('password should not be a match', async (assert) => {
    const isPasswordMatch = await matchPassword('joedoe@google.com', 'NOPENOPE')
    assert.notOk(isPasswordMatch, 'password is not a match')
  })

  t.end()
})

test('teardown', async (t) => {
  t.end()
})
