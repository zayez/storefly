const path = require('path')
const { promises: fs } = require('fs')
const test = require('tape')
const server = require('../../server')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { logAdmin } = require('../infrastructure/login')
const products = require('../fixtures/products.json').products
const images = require('../fixtures/images.json').images
const {
  createProduct,
  createProducts,
  createProductWithImage,
  createProductsWithDuplicate,
  createProductsWithExistingProduct,
  createAndUpdateProduct,
  updateProductInexistent,
  createAndDeleteProduct,
  createAndGetProduct,
  createProductExistent,
  getAllProducts,
} = require('./helpers/productsHelper')

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

  t.test('be able to create a product', async (assert) => {
    const product = { ...products[0] }
    delete product.id
    const res = await createProduct({ product, token })
    assert.equal(res.body.title, 'Created', 'Item created')
    assert.equal(res.body.product.title, product.title)
    assert.ok(Number.isInteger(res.body.product.id))
    assert.end()
  })

  t.test('be able to create a product with image', async (assert) => {
    const product = { ...products[0] }
    product.title = 'Porsche 911 3.0'
    delete product.id
    const res = await createProductWithImage({
      product,
      image: images[0],
      token,
    })

    assert.equal(res.body.title, 'Created', 'Item created')
    assert.ok(res.body.product.image.endsWith(path.basename(images[0].path)))
    assert.ok(Number.isInteger(res.body.product.id))
    const img = `./${res.body.product.image}`
    const fileExists = await fs.stat(img)
    assert.ok(fileExists, 'file was created')

    assert.end()
  })

  t.test('be able to create a collection of products', async (assert) => {
    const newProducts = [{ ...products[0] }]
    delete newProducts[0].id
    newProducts[0].title = 'Ferrari F50'
    const res = await createProducts({ products: newProducts, token })
    const lastProduct = res.body.lastProduct
    assert.equal(res.body.title, 'Created', 'Items created')
    assert.ok(
      lastProduct instanceof Object && lastProduct.constructor === Object,
    )
    // assert.ok(Array.isArray(res.body.products))
    assert.end()
  })

  t.test(
    'NOT be able to submit a create collection of products with duplicated titles',
    async (assert) => {
      const newProducts = [{ ...products[0] }, { ...products[1] }]
      delete newProducts[0].id
      delete newProducts[1].id
      newProducts[0].title = 'Ferrari F1'
      newProducts[1].title = 'Ferrari F1'
      const res = await createProductsWithDuplicate({
        products: newProducts,
        token,
      })
      assert.end()
    },
  )

  t.test(
    'NOT be able to create a collection of products with a product title already existing',
    async (assert) => {
      const newProducts = [{ ...products[0] }, { ...products[1] }]
      delete newProducts[0].id
      delete newProducts[1].id
      newProducts[1].title = 'Porsche Carrera 911'
      const res = await createProductsWithExistingProduct({
        products: newProducts,
        assert,
        token,
      })
      assert.equal(res.body.title, 'Conflict')
      assert.end()
    },
  )

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
      const res = await updateProductInexistent({ product, token })
      assert.equal(res.body.title, 'Not Found', 'title is a match')
      assert.end()
    },
  )

  t.test('be able to delete a product', async (assert) => {
    const product = { ...products[2] }
    delete product.id

    const res = await createAndDeleteProduct({ product, token })
    assert.equal(res.body.title, 'Ok', 'Product deleted')
    assert.end()
  })

  t.test('be able to retrieve a product', async (assert) => {
    const product = { ...products[3] }
    delete product.id

    const res = await createAndGetProduct({ product, assert, token })
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

test('[seeded db] As admin I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })

    token = await logAdmin()
    assert.end()
  })

  t.test('NOT be able to create a product that exists', async (assert) => {
    const product = { ...products[0] }
    delete product.id

    const res = await createProductExistent({ product, token })
    assert.equal(res.body.title, 'Conflict', 'Product alreadly exists')
    assert.end()
  })

  t.test('be able to retrieve all products', async (assert) => {
    const res = await getAllProducts({ token })
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
  const dir = 'tests/data/uploads'
  const files = await fs.readdir(dir)
  for (const f of files) {
    await fs.unlink(path.join(dir, f))
  }
  t.end()
})
