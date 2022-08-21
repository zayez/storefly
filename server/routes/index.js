const Router = require('koa-router')
const router = new Router()

const { GET_ROOT } = require('../api/endpointUrls')

const { getRoot } = require('../middlewares/application')

router.get(GET_ROOT, getRoot)

module.exports = router
