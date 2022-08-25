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
      items: [{ productId: product.id, quantity: 1 }],
    }

    const res = await placeOrder(order, { token, status: STATUS.Created })
    assert.equal(res.body.title, 'Created', 'order placed')
    assert.end()
  })

  t.test(
    'NOT be able to place order with nonexistent products',
    async (assert) => {
      const order = {
        items: [
          { productId: 9992, quantity: 1 },
          { productId: 9999, quantity: 1 },
        ],
      }

      const res = await placeOrder(order, {
        token,
        status: STATUS.Unprocessable,
      })
      assert.equal(res.body.title, 'Unprocessable', 'order not placed')
      assert.end()
    },
  )

  t.test('NOT be able to place order without items', async (assert) => {
    const order = {
      items: [],
    }

    const res = await placeOrder(order, {
      token,
      status: STATUS.Unprocessable,
    })
    assert.equal(res.body.title, 'Unprocessable', 'order not placed')
    assert.end()
  })

  t.test(
    'NOT be able to place order with insufficient inventory',
    async (assert) => {
      const product = await knex('products').first()
      const quantity = product.inventory + 10
      const order = {
        items: [{ productId: product.id, quantity }],
      }

      const res = await placeOrder(order, {
        token,
        status: STATUS.Unprocessable,
      })
      assert.equal(res.body.title, 'Unprocessable', 'order not placed')
      assert.end()
    },
  )

  test('teardown', async (t) => {
    t.end()
  })
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})
