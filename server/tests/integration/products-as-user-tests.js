const test = require('tape')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const products = require('../fixtures/products.json').products

const {
  createProduct,
  getProduct,
  getAllProducts,
} = require('./helpers/productsHelper')

test('setup', async (t) => {
  t.end()
})

test('[clean db] As a user I should:', (t) => {
  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run()

    assert.end()
  })

  t.test('NOT be able to create a product', async (assert) => {
    const product = { ...products[0] }
    delete product.id

    const res = await createProduct({ product, status: STATUS.Forbidden })
    assert.equal(res.body.title, 'Forbidden', 'not created')
    assert.end()
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })
})

test('[seeded db] As a user I should:', (t) => {
  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })

    assert.end()
  })

  t.test('be able to retrieve only active products', async (assert) => {
    const res = await getAllProducts({ status: STATUS.Ok })

    assert.equal(res.body.title, 'Ok', 'correctly retrieved')
    assert.ok(Array.isArray(res.body.products))
    const prodsDraft = res.body.products.filter((p) => p.statusId == 1)
    assert.equal(prodsDraft.length, 0, 'only active products')
    assert.end()
  })

  t.test('be able to retrieve an active product', async (assert) => {
    const product = products[1]
    const res = await getProduct(product.id, { status: STATUS.Ok })
    assert.equal(res.body.title, 'Ok', 'correctly retrieved')
    assert.equal(res.body.product.title, products[1].title)
    assert.end()
  })

  t.test('NOT be able to retrieve a draft product', async (assert) => {
    const product = products[0]
    const res = await getProduct(product.id, { status: STATUS.NotFound })
    assert.equal(res.body.title, 'Not Found', 'correctly retrieved')
    assert.end()
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})
