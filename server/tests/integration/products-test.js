const test = require('tape')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { logAdmin, logUser } = require('../infrastructure/login')
const products = require('../fixtures/products.json').products

test('setup', async (t) => {
  t.end()
})

test('[admin w/ clean db] should be able to create', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run()
    token = await logAdmin()
    assert.end()
  })

  t.test('should be able to create a product', (assert) => {
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
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        assert.equal(res.body.title, 'Created', 'Item created')
        assert.equal(res.body.product.title, newProduct.title)
        assert.end()
      })
  })

  t.test('should be able to update a category', (assert) => {
    const p1 = products[1]
    const newProduct = {
      title: p1.title,
      description: p1.description,
      price: p1.price,
      inventory: p1.inventory,
      statusId: p1.statusId,
      categoryId: p1.categoryId,
    }
    agent
      .post(`/products`)
      .send(newProduct)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        const productId = res.body.product.id
        agent
          .patch(`/products/${productId}`)
          .send({
            title: 'FORD Focus Premium',
          })
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(STATUS.Ok)
          .then((innerRes) => {
            assert.equal(innerRes.body.title, 'Ok', 'Product updated')
            assert.equal(innerRes.body.product.title, 'FORD Focus Premium')
            assert.end()
          })
      })
  })

  t.test(
    "should not be able to update a product that don't exists",
    (assert) => {
      agent
        .patch(`/products/2350`)
        .send({
          title: 'Hardware',
        })
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(STATUS.NotFound)
        .then((innerRes) => {
          assert.equal(innerRes.body.title, 'Not Found', 'title is a match')
          assert.end()
        })
    },
  )

  t.test('should be able to delete a category', (assert) => {
    const p2 = products[2]
    const newProduct = {
      title: p2.title,
      description: p2.description,
      price: p2.price,
      inventory: p2.inventory,
      statusId: p2.statusId,
      categoryId: p2.categoryId,
    }
    agent
      .post(`/products`)
      .send(newProduct)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        const productId = res.body.product.id
        agent
          .delete(`/products/${productId}`)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(STATUS.Ok)
          .then((innerRes) => {
            assert.equal(innerRes.body.title, 'Ok', 'Product deleted')
            assert.end()
          })
      })
  })

  t.test('should be able to retrieve a product', (assert) => {
    const p3 = products[3]
    const newProduct = {
      title: p3.title,
      description: p3.description,
      price: p3.price,
      inventory: p3.inventory,
      statusId: p3.statusId,
      categoryId: p3.categoryId,
    }

    agent
      .post(`/products`)
      .send(newProduct)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        const productId = res.body.product.id
        agent
          .get(`/products/${productId}`)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(STATUS.Ok)
          .then((innerRes) => {
            assert.equal(innerRes.body.title, 'Ok', 'Product retrieved')
            assert.equal(
              innerRes.body.product.title,
              newProduct.title,
              'equal name',
            )
            assert.end()
          })
      })
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })

  t.end()
})

test('[admin w/ seeded db] should be able retrieve', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })

    token = await logAdmin()
    assert.end()
  })

  t.test('should NOT be able to create a product that exists', (assert) => {
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
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Conflict)
      .then((res) => {
        assert.equal(res.body.title, 'Conflict', 'Product alreadly exists')
        assert.end()
      })
  })

  t.test('should be able to retrieve all products', (assert) => {
    agent
      .get(`/products`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Ok)
      .then((res) => {
        assert.equal(res.body.title, 'Ok', 'Products retrieved')
        assert.ok(Array.isArray(res.body.products))
        assert.equal(
          res.body.products.length,
          products.length,
          'array w/ right length',
        )
        assert.end()
      })
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })
})

test('[user w/ seeded db] should be able retrieve', (t) => {
  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })

    assert.end()
  })

  t.test('should be able to retrieve only active products', (assert) => {
    agent
      .get(`/products`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Ok)
      .then((res) => {
        assert.equal(res.body.title, 'Ok', 'Products retrieved')
        assert.ok(Array.isArray(res.body.products))
        const prodsDraft = res.body.products.filter((p) => p.statusId == 1)
        assert.equal(prodsDraft.length, 0, 'should only have active')
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
