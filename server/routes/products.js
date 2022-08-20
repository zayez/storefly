const Router = require('koa-router')
const router = new Router()

const {
  create,
  createCollection,
  update,
  destroy,
  get,
  getAll,
} = require('../middlewares/products')

router.post('/products', create)
router.post('/products/collections', createCollection)
router.patch('/products/:id', update)
router.delete('/products/:id', destroy)
router.get('/products/:id', get)
router.get('/products', getAll)

module.exports = router
