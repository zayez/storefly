const Router = require('koa-router')
const router = new Router()

const {
  create,
  update,
  destroy,
  get,
  getAll,
} = require('../middlewares/categories')

router.post('/categories', create)
router.patch('/categories/:id', update)
router.delete('/categories/:id', destroy)
router.get('/categories/:id', get)
router.get('/categories', getAll)

module.exports = router
