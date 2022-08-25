const test = require('tape')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { login, decodeToken } = require('../infrastructure/login')
const customers = require('../fixtures/users.json').customers
const { server, placeOrder, getByUser } = require('../requests/orders')

test('setup', async (t) => {
  t.end()
})

test('As a customer I should:', (t) => {
  const customer = customers[0]
  let token
  let customerId = ''

  t.test('setup', async (assert) => {
    await knex.seed.run({ directory: 'tests/seeds' })
    assert.end()
  })

  t.test('be able to sign in', async (assert) => {
    token = await login(customer.email, customer.password)
    customerId = decodeToken(token)
    assert.notEqual(token, '', 'user signed in')
    assert.notEqual(customerId, '', 'token decoded')
    assert.end()
  })

  t.test('be able to place an order', async (assert) => {
    const product = await knex('products').first()
    const order = {
      items: [{ productId: product.id, quantity: 1 }],
    }

    const res = await placeOrder(order, { token, status: STATUS.Created })
    const createdOrder = res.body.order
    assert.equal(res.body.title, 'Created', 'order placed')
    assert.equal(
      createdOrder.items[0].id,
      product.id,
      'order has the correct product',
    )
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

  t.test('be able to get my orders', async (assert) => {
    const products = await knex('products')

    const order1 = {
      items: [{ productId: products[1].id, quantity: 1 }],
      dateOrder: new Date().toISOString(),
    }
    const order2 = {
      items: [{ productId: products[2].id, quantity: 1 }],
      dateOrder: new Date().toISOString(),
    }
    await placeOrder(order1, { token, status: STATUS.Created })
    await placeOrder(order2, { token, status: STATUS.Created })

    const userOrders = (await knex('orders').where({ userId: customerId })).map(
      (o) => o.id,
    )

    const res = await getByUser(customerId, { token, status: STATUS.Ok })
    const retrievedOrders = res.body.orders.map((o) => o.id)

    assert.equal(res.body.title, 'Ok', 'orders retrieved')
    assert.deepEqual(retrievedOrders, userOrders, 'retrieved orders match')
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
