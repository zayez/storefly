const compose = require('koa-compose')
const ApplicationMiddleware = require('./applicationMiddleware')

const getRoot = compose([ApplicationMiddleware.getRoot])

module.exports = {
  getRoot,
}
