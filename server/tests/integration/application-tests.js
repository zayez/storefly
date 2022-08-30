const test = require('tape')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const customers = require('../fixtures/users.json').customers
const { server, getRoot, signIn, signUp } = require('../requests/application')
const { faker } = require('@faker-js/faker')

test('setup', async (t) => {
  await knex.seed.run({ directory: 'tests/seeds' })
  t.end()
})

test('As a visitor I should:', (t) => {
  t.test('setup', async (assert) => {
    assert.end()
  })

  t.test('be able to access root endpoint', async (assert) => {
    const res = await getRoot(STATUS.Ok)
    assert.equal(res.body.greeting, 'hella!')
    assert.end()
  })

  t.test('be able to sign up', async (assert) => {
    const user = createRandomUser()

    const res = await signUp(user, { status: STATUS.Created })
    assert.equal(res.status, STATUS.Created)
    assert.ok(res.body instanceof Object && res.body.constructor === Object)
    assert.notEqual(res.body.token, '')
    assert.end()
  })

  t.test('NOT be able to sign up with email already used', async (assert) => {
    const user = await knex('users').first()
    const newUser = createRandomUser()
    newUser.email = user.email
    const res = await signUp(newUser, { status: STATUS.Conflict })

    assert.equal(res.status, STATUS.Conflict)
    assert.end()
  })

  test('teardown', async (t) => {
    t.end()
  })
})

test('As a customer I should:', (t) => {
  const customer = customers[0]

  t.test('setup', async (assert) => {
    assert.end()
  })

  t.test('be able to sign in', async (assert) => {
    const res = await signIn(customer.email, customer.password, {
      status: STATUS.Ok,
    })
    assert.equal(res.status, STATUS.Ok)
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

function createRandomUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}
