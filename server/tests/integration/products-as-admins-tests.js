const test = require('tape')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { logAdmin } = require('../infrastructure/login')
const products = require('../fixtures/products.json').products

test('setup', async (t) => {
  t.end()
})

test('[clean db] As admin I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run()
    token = await logAdmin()
    assert.end()
  })

  t.test('be able to create a product', (assert) => {
    const product = { ...products[0] }
    delete product.id
    createProduct({ product, assert, token })
  })

  t.test('be able to create a collection of products', (assert) => {
    const newProducts = [{ ...products[0] }]
    delete newProducts[0].id
    newProducts[0].title = 'Ferrari F50'
    createProducts({ products: newProducts, assert, token })
  })

  t.test(
    'NOT be able to submit a create collection of products with duplicated titles',
    (assert) => {
      const newProducts = [{ ...products[0] }, { ...products[1] }]
      delete newProducts[0].id
      delete newProducts[1].id
      newProducts[0].title = 'Ferrari F1'
      newProducts[1].title = 'Ferrari F1'
      createProductsWithDuplicate({ products: newProducts, assert, token })
    },
  )

  t.test(
    'NOT be able to create a collection of products with a product title already existing',
    (assert) => {
      const newProducts = [{ ...products[0] }, { ...products[1] }]
      delete newProducts[0].id
      delete newProducts[1].id
      newProducts[1].title = 'Porsche Carrera 911'
      createProductsWithExistingProduct({
        products: newProducts,
        assert,
        token,
      })
    },
  )

  t.test('be able to update a product', (assert) => {
    const productCreate = { ...products[1] }
    delete productCreate.id
    const productUpdate = {
      title: 'FORD Focus Premium',
    }
    createAndUpdateProduct({ productCreate, productUpdate, assert, token })
  })

  t.test("NOT be able to update a product that don't exists", (assert) => {
    const product = {
      title: 'Hardware',
    }
    updateProductInexistent({ product, assert, token })
  })

  t.test('be able to delete a product', (assert) => {
    const product = { ...products[2] }
    delete product.id

    createAndDeleteProduct({ product, assert, token })
  })

  t.test('be able to retrieve a product', (assert) => {
    const product = { ...products[3] }
    delete product.id

    createAndGetProduct({ product, assert, token })
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })

  t.end()
})

test('[seeded db] As admin I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })

    token = await logAdmin()
    assert.end()
  })

  t.test('NOT be able to create a product that exists', (assert) => {
    const product = { ...products[0] }
    delete product.id

    createProductExistent({ product, assert, token })
  })

  t.test('be able to retrieve all products', (assert) => {
    getAllProducts({ assert, token })
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

const createProduct = ({ product, assert, token }) => {
  agent
    .post(`/products`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Created)
    .then((res) => {
      assert.equal(res.body.title, 'Created', 'Item created')
      assert.equal(res.body.product.title, product.title)
      assert.ok(Number.isInteger(res.body.product.id))
      assert.end()
    })
}

const createProducts = ({ products, assert, token }) => {
  agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Created)
    .then((res) => {
      const lastProduct = res.body.lastProduct
      assert.equal(res.body.title, 'Created', 'Items created')
      assert.ok(
        lastProduct instanceof Object && lastProduct.constructor === Object,
      )
      // assert.ok(Array.isArray(res.body.products))
      assert.end()
    })
}

const createProductsWithDuplicate = ({ products, assert, token }) => {
  agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.BadRequest)
    .then((res) => {
      assert.end()
    })
}

const createProductsWithExistingProduct = ({ products, assert, token }) => {
  agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Conflict)
    .then((res) => {
      assert.equal(res.body.title, 'Conflict')
      assert.end()
    })
}

const createAndUpdateProduct = ({
  productCreate,
  productUpdate,
  assert,
  token,
}) => {
  agent
    .post(`/products`)
    .send(productCreate)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Created)
    .then((res) => {
      const productId = res.body.product.id
      agent
        .patch(`/products/${productId}`)
        .send(productUpdate)
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(STATUS.Ok)
        .then((innerRes) => {
          assert.equal(innerRes.body.title, 'Ok', 'Product updated')
          assert.equal(innerRes.body.product.title, productUpdate.title)
          assert.end()
        })
    })
}

const updateProductInexistent = ({ product, assert, token }) => {
  agent
    .patch(`/products/2350`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.NotFound)
    .then((innerRes) => {
      assert.equal(innerRes.body.title, 'Not Found', 'title is a match')
      assert.end()
    })
}

const createAndDeleteProduct = ({ product, assert, token }) => {
  agent
    .post(`/products`)
    .send(product)
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
}

const createAndGetProduct = ({ product, assert, token }) => {
  agent
    .post(`/products`)
    .send(product)
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
          assert.equal(innerRes.body.product.title, product.title, 'equal name')
          assert.end()
        })
    })
}

const createProductExistent = ({ product, assert, token }) => {
  agent
    .post(`/products`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Conflict)
    .then((res) => {
      assert.equal(res.body.title, 'Conflict', 'Product alreadly exists')
      assert.end()
    })
}

const getAllProducts = ({ assert, token }) => {
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
}
