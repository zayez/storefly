const path = require('path')
const request = require('supertest')
const server = require('../../../server')
const STATUS = require('../../../types/StatusCode')
const agent = request.agent(server)

const setHeaders = (token) => {
  const headers = {}
  if (token) headers['Authorization'] = token
  return headers
}

const createProduct = async ({ product, token, status }) => {
  const headers = setHeaders(token)
  return await agent
    .post(`/products`)
    .send(product)
    .set(headers)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(status)
    .then((res) => res)
}

const createProducts = async ({ products, token, status }) => {
  return await agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(status)
    .then((res) => res)
}

const createProductWithImage = async ({ product, image, token, status }) => {
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
      if (res.status !== status) {
        console.log(JSON.stringify(res.body, null, 2))
      }
    })
    .expect(status)
    .then((res) => res)
}

const createProductsWithDuplicate = async ({ products, token, status }) => {
  return await agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(STATUS.BadRequest)
    .then((res) => res)
}

const createProductsWithExistingProduct = async ({
  products,
  token,
  status,
}) => {
  return await agent
    .post(`/products/collections`)
    .send({ products })
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(status)
    .then((res) => res)
}

const createAndUpdateProduct = async ({
  productCreate,
  productUpdate,
  token,
  status,
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
        .expect(status)
        .then((innerRes) => innerRes)
    })
}

const updateProductInexistent = async ({ product, token, status }) => {
  return await agent
    .patch(`/products/2350`)
    .send(product)
    .set('Authorization', token)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(status)
    .then((res) => res)
}

const createAndDeleteProduct = async ({ product, token, status }) => {
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
        .expect(status)
        .then((innerRes) => innerRes)
    })
}

const createAndGetProduct = async ({ product, token, status }) => {
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
        .expect(status)
        .then((innerRes) => innerRes)
    })
}

const getProduct = async (id, { token, status }) => {
  const headers = setHeaders(token)
  return await agent
    .get(`/products/${id}`)
    .set(headers)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(status)
    .then((res) => res)
}

const getAllProducts = async ({ token, status }) => {
  const headers = setHeaders(token)
  return await agent
    .get(`/products`)
    .set(headers)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(status)
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
  getProduct,
  getAllProducts,
}
