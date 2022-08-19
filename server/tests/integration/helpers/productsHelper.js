const path = require('path')
const request = require('supertest')
const server = require('../../../server')
const STATUS = require('../../../types/StatusCode')
const agent = request.agent(server)

const createProduct = async ({ product, token }) => {
  return await agent
    .post(`/products`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Created)
    .then((res) => res)
}

const createProducts = async ({ products, token }) => {
  return await agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Created)
    .then((res) => res)
}

const createProductWithImage = async ({ product, image, token }) => {
  const imagepath = path.join(__dirname, `../../${image.path}`)

  return await agent
    .post(`/products`)
    .field('title', product.title)
    .field('statusId', product.statusId)
    .field('categoryId', product.categoryId)
    .field('inventory', product.inventory)
    .field('price', product.price)
    .attach('image', imagepath)
    .set('Content-Type', 'multipart/form-data')
    .set('Authorization', token)
    .set('Accept', 'multipart/form-data')
    .expect('Content-Type', /json/)
    .expect((res) => {
      if (res.status !== STATUS.Created) {
        console.log(JSON.stringify(res.body, null, 2))
      }
    })
    .expect(STATUS.Created)
    .then((res) => res)
}

const createProductsWithDuplicate = async ({ products, token }) => {
  return await agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.BadRequest)
    .then((res) => res)
}

const createProductsWithExistingProduct = async ({ products, token }) => {
  return await agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Conflict)
    .then((res) => res)
}

const createAndUpdateProduct = async ({
  productCreate,
  productUpdate,
  token,
}) => {
  return await agent
    .post(`/products`)
    .send(productCreate)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Created)
    .then(async (res) => {
      const productId = res.body.product.id
      return await agent
        .patch(`/products/${productId}`)
        .send(productUpdate)
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(STATUS.Ok)
        .then((innerRes) => innerRes)
    })
}

const updateProductInexistent = async ({ product, token }) => {
  return await agent
    .patch(`/products/2350`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.NotFound)
    .then((res) => res)
}

const createAndDeleteProduct = async ({ product, token }) => {
  return await agent
    .post(`/products`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Created)
    .then(async (res) => {
      const productId = res.body.product.id
      return await agent
        .delete(`/products/${productId}`)
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(STATUS.Ok)
        .then((innerRes) => innerRes)
    })
}

const createAndGetProduct = async ({ product, token }) => {
  return await agent
    .post(`/products`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Created)
    .then(async (res) => {
      const productId = res.body.product.id
      return await agent
        .get(`/products/${productId}`)
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(STATUS.Ok)
        .then((innerRes) => innerRes)
    })
}

const createProductExistent = async ({ product, token }) => {
  return await agent
    .post(`/products`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Conflict)
    .then((res) => res)
}

const getAllProducts = async ({ token }) => {
  return await agent
    .get(`/products`)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.Ok)
    .then((res) => res)
}

module.exports = {
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
}
