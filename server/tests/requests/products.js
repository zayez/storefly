const path = require('path')
const requests = require('../helpers/requestBuilder')('', 'products')
const agent = requests.agent
const { debugStatus } = require('../helpers/requestHelpers')

const createUpload = async ({ product, image, token, status }) => {
  const imagepath = path.join(__dirname, `../${image.path}`)

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
    .expect((res) => debugStatus(res, status))
    .expect(status)
    .then((res) => res)
}

module.exports = {
  ...requests,
  createUpload,
}
