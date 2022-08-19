const test = require('tape')
const server = require('../../server')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { logEditor } = require('../infrastructure/login')
const products = require('../fixtures/products.json').products

const {
  createProduct,
  createAndUpdateProduct,
  updateProductInexistent,
  createAndDeleteProduct,
  createAndGetProduct,
  getAllProducts,
} = require('./helpers/productsHelper')

test('setup', async (t) => {
  t.end()
})

test('[clean db] As editor I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run()
    token = await logEditor()
    assert.end()
  })

  t.test('be able to create a product', async (assert) => {
    const product = { ...products[0] }
    delete product.id
    const res = await createProduct({ product, token, status: STATUS.Created })
    assert.equal(res.body.title, 'Created', 'Item created')
    assert.equal(res.body.product.title, product.title)
    assert.ok(Number.isInteger(res.body.product.id))
    assert.end()
  })

  t.test('be able to update a product', async (assert) => {
    const productCreate = { ...products[1] }
    delete productCreate.id
    const productUpdate = {
      title: 'FORD Focus Premium',
    }
    const res = await createAndUpdateProduct({
      productCreate,
      productUpdate,
      token,
      status: STATUS.Ok,
    })
    assert.equal(res.body.title, 'Ok', 'Product updated')
    assert.equal(res.body.product.title, productUpdate.title)
    assert.end()
  })

  t.test(
    "NOT be able to update a product that don't exists",
    async (assert) => {
      const product = {
        title: 'Hardware',
      }
      const res = await updateProductInexistent({
        product,
        token,
        status: STATUS.NotFound,
      })
      assert.equal(res.body.title, 'Not Found', 'title is a match')
      assert.end()
    },
  )

  t.test('be able to delete a product', async (assert) => {
    const product = { ...products[2] }
    delete product.id

    const res = await createAndDeleteProduct({
      product,
      token,
      status: STATUS.Ok,
    })
    assert.equal(res.body.title, 'Ok', 'Product deleted')
    assert.end()
  })

  t.test('be able to retrieve a product', async (assert) => {
    const product = { ...products[3] }
    delete product.id

    const res = await createAndGetProduct({ product, token, status: STATUS.Ok })
    assert.equal(res.body.title, 'Ok', 'Product retrieved')
    assert.equal(res.body.product.title, product.title, 'equal name')
    assert.end()
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })

  t.end()
})

test('[seeded db] As editor I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })

    token = await logEditor()
    assert.end()
  })

  t.test('NOT be able to create a product that exists', async (assert) => {
    const product = { ...products[0] }
    delete product.id

    const res = await createProduct({
      product,
      token,
      status: STATUS.Conflict,
    })
    assert.equal(res.body.title, 'Conflict', 'Product alreadly exists')
    assert.end()
  })

  t.test('be able to retrieve all products', async (assert) => {
    const res = await getAllProducts({ token, status: STATUS.Ok })
    const resProds = res.body.products
    assert.equal(res.body.title, 'Ok', 'Products retrieved')
    assert.ok(Array.isArray(resProds))
    assert.equal(resProds.length, products.length, 'array w/ right length')
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
