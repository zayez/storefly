const path = require('path')
const { promises: fs } = require('fs')
const test = require('tape')
const { faker } = require('@faker-js/faker')
const knex = require('../../db')
const STATUS = require('../../types/StatusCode')
const { logAdmin } = require('../infrastructure/login')
const { existsFile } = require('../../helpers/fsHelper')
const products = require('../fixtures/products.json').products
const images = require('../fixtures/images.json').images
const productTitle = () => faker.commerce.productName()

const {
  server,
  create,
  update,
  destroy,
  createAll,
  createUpload,
  updateUpload,
  getOne,
  getAll,
} = require('../requests/products')

test('setup', async (t) => {
  t.end()
})

test('As admin I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })
    token = await logAdmin()
    assert.end()
  })

  t.test('be able to create a product', async (assert) => {
    const product = { ...products[0] }
    delete product.id
    product.title = productTitle()
    const res = await create(product, { token, status: STATUS.Created })
    assert.equal(res.body.title, 'Created', 'Item created')
    assert.equal(res.body.product.title, product.title)
    assert.ok(Number.isInteger(res.body.product.id))
    assert.end()
  })

  t.test('be able to create a product with image', async (assert) => {
    const product = { ...products[0] }
    product.title = productTitle()
    delete product.description
    delete product.id
    const res = await createUpload(product, images[0], {
      token,
      status: STATUS.Created,
    })

    assert.equal(res.body.title, 'Created', 'Item created')
    assert.ok(res.body.product.image.endsWith(path.basename(images[0].path)))
    assert.ok(Number.isInteger(res.body.product.id))
    const img = `./${res.body.product.image}`
    const fileExists = await fs.stat(img)
    assert.ok(fileExists, 'file was created')

    assert.end()
  })

  t.test('be able to update a product with new image', async (assert) => {
    const product = { ...products[0] }
    product.title = productTitle()
    delete product.id
    const res = await createUpload(product, images[0], {
      token,
      status: STATUS.Created,
    })
    const newProduct = res.body.product

    const productUpdate = {}
    const resUpdate = await updateUpload(newProduct.id, {}, images[1], {
      token,
      status: STATUS.Ok,
    })
    const updatedProduct = resUpdate.body.product

    assert.equal(resUpdate.body.title, 'Ok', 'Item created')
    assert.ok(updatedProduct.image.endsWith(path.basename(images[1].path)))
    const oldImg = `./${newProduct.image}`
    const newImg = `./${updatedProduct.image}`

    assert.ok(await existsFile(newImg), 'new image was created')
    assert.notOk(await existsFile(oldImg), 'old image was deleted')

    assert.end()
  })

  t.test('be able to create a collection of products', async (assert) => {
    const newProducts = [{ ...products[0] }]
    delete newProducts[0].id
    newProducts[0].title = productTitle()
    const res = await createAll(
      { products: newProducts },
      {
        token,
        status: STATUS.Created,
      },
    )

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
      const repeatedTitle = productTitle()
      const newProducts = [{ ...products[0] }, { ...products[1] }]
      delete newProducts[0].id
      delete newProducts[1].id
      newProducts[0].title = repeatedTitle
      newProducts[1].title = repeatedTitle
      const res = await createAll(
        { products: newProducts },
        {
          token,
          status: STATUS.BadRequest,
        },
      )
      assert.end()
    },
  )

  t.test(
    'NOT be able to create a collection of products with a product title already existing',
    async (assert) => {
      const existingProduct = await knex('products').first()
      const newProducts = [{ ...products[0] }, { ...products[1] }]
      delete newProducts[0].id
      delete newProducts[1].id
      newProducts[0].title = existingProduct.title
      newProducts[1].title = productTitle()
      const res = await createAll(
        {
          products: newProducts,
        },
        {
          token,
          status: STATUS.Conflict,
        },
      )
      assert.equal(res.body.title, 'Conflict')
      assert.end()
    },
  )

  t.test('NOT be able to reference inexistent category', async (assert) => {
    const newProduct = { ...products[0] }
    delete newProduct.id
    newProduct.title = productTitle()
    newProduct.categoryId = 2345
    const res = await create(newProduct, {
      token,
      status: STATUS.Unprocessable,
    })
    assert.equal(res.body.title, 'Unprocessable')
    assert.equal(res.body.error, 'categoryId references inexistent entity.')
    assert.end()
  })

  t.test('NOT be able to reference inexistent status', async (assert) => {
    const newProduct = { ...products[0] }
    delete newProduct.id
    newProduct.title = productTitle()
    newProduct.statusId = 23423
    const res = await create(newProduct, {
      token,
      status: STATUS.Unprocessable,
    })
    assert.equal(res.body.title, 'Unprocessable')
    assert.equal(res.body.error, 'statusId references inexistent entity.')
    assert.end()
  })

  t.test('be able to update category of a product', async (assert) => {
    const prod = products[3]
    prod.categoryId = 3
    delete p
    const id = prod.id
    delete prod.id
    const res = await update(id, prod, { token, status: STATUS.Ok })
    assert.equal(res.body.product.categoryId, 3)
    assert.end()
  })

  t.test(
    'NOT be able to update product with inexestent category',
    async (assert) => {
      const newProduct = { ...products[0] }
      newProduct.title = productTitle()
      delete newProduct.id
      const res = await create(newProduct, {
        token,
        status: STATUS.Created,
      })
      const createdProd = res.body.product

      const updateProduct = { categoryId: 987 }
      const resUpdate = await update(createdProd.id, updateProduct, {
        token,
        status: STATUS.Unprocessable,
      })
      assert.end()
    },
  )

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
    resProd = resCreate.body.product
    const res = await update(resProd.id, productUpdate, {
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
        title: productTitle(),
      }
      const res = await update(564, product, {
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
    product.title = productTitle()

    const resCreate = await create(product, { token, status: STATUS.Created })
    const resProd = resCreate.body.product
    const res = await destroy(resProd.id, {
      token,
      status: STATUS.Ok,
    })
    assert.equal(res.body.title, 'Ok', 'Product deleted')
    assert.end()
  })

  t.test('be able to retrieve a product', async (assert) => {
    const product = { ...products[3] }
    delete product.id
    product.title = productTitle()

    const resCreate = await create(product, { token, status: STATUS.Created })
    const resProd = resCreate.body.product
    const res = await getOne(resProd.id, { token, status: STATUS.Ok })
    assert.equal(res.body.title, 'Ok', 'Product retrieved')
    assert.equal(res.body.product.title, product.title, 'equal name')
    assert.end()
  })

  t.test('NOT be able to create a product that exists', async (assert) => {
    const product = { ...products[0] }
    delete product.id

    const res = await create(product, {
      token,
      status: STATUS.Conflict,
    })
    assert.equal(res.body.title, 'Conflict', 'Product alreadly exists')
    assert.end()
  })

  t.test('be able to retrieve a draft product', async (assert) => {
    const product = products[0]
    const res = await getOne(product.id, { token, status: STATUS.Ok })
    assert.equal(res.body.title, 'Ok', 'correctly retrieved')
    assert.end()
  })

  t.test('be able to retrieve all products', async (assert) => {
    const allProducts = await knex('products')
    const res = await getAll({ token, status: STATUS.Ok })
    const resProds = res.body.products
    assert.equal(res.body.title, 'Ok', 'Products retrieved')
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
  const dir = 'tests/data/uploads'
  const files = await fs.readdir(dir)
  for (const f of files) {
    await fs.unlink(path.join(dir, f))
  }
  t.end()
})
