const test = require('tape')
const { faker } = require('@faker-js/faker')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { logEditor } = require('../infrastructure/login')
const products = require('../fixtures/products.json').products
const productTitle = () => {
  const title = `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`
  return title
}
const {
  server,
  create,
  update,
  destroy,
  getOne,
  getAll,
} = require('../requests/products')

test('setup', async (t) => {
  t.end()
})

test('[clean db] As editor I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })
    token = await logEditor()
    assert.end()
  })

  t.test('be able to create a product', async (assert) => {
    const product = { ...products[0] }
    delete product.id
    product.title = productTitle()
    const res = await create(product, { token, status: STATUS.Created })

    assert.equal(res.status, STATUS.Created)
    assert.equal(res.body.title, product.title)
    assert.ok(Number.isInteger(res.body.id))
    assert.end()
  })

  t.test('be able to update a product', async (assert) => {
    const productCreate = { ...products[1] }
    productCreate.title = productTitle()
    delete productCreate.id
    const productUpdate = {
      title: productTitle(),
    }

    const resCreate = await create(productCreate, {
      token,
      status: STATUS.Created,
    })
    const resProd = resCreate.body

    const res = await update(resProd.id, productUpdate, {
      token,
      status: STATUS.Ok,
    })

    assert.equal(res.status, STATUS.Ok)
    assert.equal(res.body.title, productUpdate.title)
    assert.end()
  })

  t.test(
    "NOT be able to update a product that don't exists",
    async (assert) => {
      const product = {
        title: productTitle(),
      }
      const res = await update(6456, product, {
        token,
        status: STATUS.NotFound,
      })

      assert.equal(res.status, STATUS.NotFound)
      assert.end()
    },
  )

  t.test('be able to delete a product', async (assert) => {
    const product = { ...products[2] }
    product.title = productTitle()
    delete product.id

    const resCreate = await create(product, { token, status: STATUS.Created })
    const resProd = resCreate.body
    const res = await destroy(resProd.id, { token, status: STATUS.Ok })

    assert.equal(res.status, STATUS.Ok)
    assert.end()
  })

  t.test('be able to retrieve a product', async (assert) => {
    const product = { ...products[3] }
    product.title = productTitle()
    delete product.id

    const resCreate = await create(product, { token, status: STATUS.Created })
    const resProd = resCreate.body
    const res = await getOne(resProd.id, { token, status: STATUS.Ok })

    assert.equal(res.status, STATUS.Ok)
    assert.equal(res.body.title, product.title, 'equal name')
    assert.end()
  })

  t.test('NOT be able to create a product that exists', async (assert) => {
    const product = { ...products[0] }
    delete product.id

    const res = await create(product, { token, status: STATUS.Conflict })

    assert.equal(res.status, STATUS.Conflict)
    assert.end()
  })

  t.test('be able to retrieve all products', async (assert) => {
    const allProducts = await knex('products')
    const res = await getAll({ token, status: STATUS.Ok })
    const resProds = res.body

    assert.equal(res.status, STATUS.Ok)
    assert.ok(Array.isArray(resProds))
    assert.equal(resProds.length, allProducts.length, 'array w/ right length')
    assert.end()
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })

  t.end()
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})
