const test = require('tape')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { login } = require('../infrastructure/login')
const customers = require('../fixtures/users.json').customers
const { server, placeOrder } = require('../requests/orders')

test('setup', async (t) => {
  t.end()
})

test('As a customer I should:', (t) => {
  const customer = customers[0]
  let token

  t.test('setup', async (assert) => {
    await knex.seed.run({ directory: 'tests/seeds' })
    assert.end()
  })

  t.test('be able to sign in', async (assert) => {
    token = await login(customer.email, customer.password)
    assert.notEqual(token, '', 'user signed in')
    assert.end()
  })

  t.test('be able to place an order', async (assert) => {
    const product = await knex('products').first()
    const order = {
      products: [{ productId: product.id, quantitity: 1 }],
    }

    const res = await placeOrder(order, { token, status: STATUS.Created })
    console.log(res.body)
    assert.equal(res.body.title, 'Created', 'order placed')
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
