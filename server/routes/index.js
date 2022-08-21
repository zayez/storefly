const Router = require('koa-router')
const router = new Router()

const { ROOT } = require('../api/endpointUrls')

router.get(ROOT, async (ctx) => (ctx.body.message = 'hella!'))

module.exports = router
