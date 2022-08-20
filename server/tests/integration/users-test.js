const test = require('tape')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')

const { logAdmin, logUser, login } = require('../infrastructure/login')
const { server, create, signIn, signUp } = require('../requests/users')
const customers = require('../fixtures/users.json').customers

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

  t.test('be able to sign up', async (assert) => {
    const user = {
      firstName: customers[0].firstName,
      lastName: customers[0].lastName,
      email: customers[0].email,
      password: customers[0].password,
    }

    const res = await signUp(user, { status: STATUS.Created })
    assert.equal(res.body.title, 'Created', 'User was created')
    assert.ok(res.body instanceof Object && res.body.constructor === Object)
    assert.end()
  })

  test('teardown', async (t) => {
    await knex.seed.run()
    t.end()
  })
})

test('[seeded db] As a customer I should:', (t) => {
  const customer = customers[0]

  t.test('setup', async (assert) => {
    await knex.seed.run({ directory: 'tests/seeds' })
    assert.end()
  })

  t.test('be able to sign in', async (assert) => {
    const res = await signIn(customer.email, customer.password, {
      status: STATUS.Ok,
    })
    assert.equal(res.body.title, 'Ok', 'user signed in')
    assert.notEqual(res.body.token, '', 'token is not empty')
    assert.end()
  })

  test('teardown', async (t) => {
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
