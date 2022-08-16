const test = require('tape')
const request = require('supertest')
const server = require('../../../server')
const agent = request.agent(server)
const knex = require('../../../db')
const STATUS = require('../../../types/StatusCode')
const { logAdmin, logUser } = require('../../infrastructure/login')
const products = require('../../fixtures/products.json').products

test('setup', async (t) => {
  t.end()
})

test('[clean db] As a user I should:', (t) => {
  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run()

    assert.end()
  })

  t.test('NOT be able to create a product', (assert) => {
    const p0 = products[0]
    const newProduct = {
      title: p0.title,
      description: p0.description,
      price: p0.price,
      inventory: p0.inventory,
      statusId: p0.statusId,
      categoryId: p0.categoryId,
    }
    agent
      .post(`/products`)
      .send(newProduct)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Forbidden)
      .then((res) => {
        assert.equal(res.body.title, 'Forbidden', 'not created')
        assert.end()
      })
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

  t.test('be able to retrieve only active products', (assert) => {
    agent
      .get(`/products`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Ok)
      .then((res) => {
        assert.equal(res.body.title, 'Ok', 'correctly retrieved')
        assert.ok(Array.isArray(res.body.products))
        const prodsDraft = res.body.products.filter((p) => p.statusId == 1)
        assert.equal(prodsDraft.length, 0, 'only active products')
        assert.end()
      })
  })

  t.test('be able to retrieve an active product', (assert) => {
    agent
      .get(`/products/${products[1].id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Ok)
      .then((res) => {
        assert.equal(res.body.title, 'Ok', 'correctly retrieved')
        assert.equal(res.body.product.title, products[1].title)
        assert.end()
      })
  })

  t.test('NOT be able to retrieve a draft product', (assert) => {
    agent
      .get(`/products/${products[0].id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.NotFound)
      .then((res) => {
        assert.equal(res.body.title, 'Not Found', 'correctly retrieved')
        assert.end()
      })
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
