const test = require('tape')

const jwt = require('jsonwebtoken')

const { SECRET } = require('../../config').jwt

const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const customers = require('../fixtures/users.json').customers

const { logAdmin, logUser, login } = require('../infrastructure/login')
const { server, create, update } = require('../requests/users')
const User = require('../../models/user')

test('setup', async (t) => {
  await knex.migrate.latest()
  await knex.seed.run()
  t.end()
})

test('As an admin I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    token = await logAdmin()
    assert.end()
  })

  t.test('be able to create a new user', async (assert) => {
    const user = { ...customers[0] }
    delete user.id
    const res = await create(user, { token, status: STATUS.Created })
    const newUser = res.body.user
    assert.equal(newUser.email, user.email)
    assert.equal(newUser.firstName, user.firstName)
    assert.ok(Number.isInteger(newUser.id))

    assert.end()
  })

  test('teardown', async (t) => {
    t.end()
  })

  t.end()
})

test('As a customer I should:', (t) => {
  let token
  let userId
  const user = customers[0]

  t.test('setup', async (assert) => {
    await knex.seed.run({ directory: 'tests/seeds' })
    token = await login(user.email, user.password)
    const decodedToken = jwt.verify(token, SECRET)
    userId = decodedToken.sub
    assert.end()
  })

  t.test('be able to sign in', async (assert) => {
    assert.notEqual(token, '')
    assert.end()
  })

  t.test('be able to update my name', async (assert) => {
    const name = 'Harold'
    const res = await update(
      userId,
      { firstName: name },
      { token, status: STATUS.Ok },
    )
    const updatedUser = res.body.user
    assert.equal(updatedUser.firstName, name)
    assert.equal(updatedUser.id, userId)
    assert.ok(Number.isInteger(updatedUser.id))

    assert.end()
  })

  t.test('NOT be able to update another user', async (assert) => {
    const name = 'Bean'
    const users = await User.find({ lastName: 'Doe' })
    const res = await update(
      users[0].id,
      { firstName: name },
      { token, status: STATUS.Forbidden },
    )

    assert.end()
  })

  t.test('be able to update my password', async (assert) => {
    const newPassword = 'abcd1234'
    const res = await update(
      userId,
      { password: newPassword },
      { token, status: STATUS.Ok },
    )
    const updatedUser = await User.findById(userId)
    const isMatch = await User.comparePassword(
      newPassword,
      updatedUser.password,
    )
    assert.ok(isMatch)
    assert.end()
  })

  test('teardown', async (t) => {
    await knex.seed.run()
    t.end()
  })

  t.end()
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})
