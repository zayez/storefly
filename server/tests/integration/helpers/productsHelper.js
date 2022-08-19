const path = require('path')
const request = require('supertest')
const server = require('../../../server')
const STATUS = require('../../../types/StatusCode')

const agent = request.agent(server)

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

module.exports = {
  createProductWithImage,
}
