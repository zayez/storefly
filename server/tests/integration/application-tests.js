const test = require('tape')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const customers = require('../fixtures/users.json').customers
const { server, getRoot, signIn, signUp } = require('../requests/application')

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

test('teardown', async (t) => {
  await server.close()
  t.end()
})
