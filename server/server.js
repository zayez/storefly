const fs = require('fs')
const Koa = require('koa')
const cors = require('@koa/cors')
const serve = require('koa-static')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
const passport = require('koa-passport')
const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')
const categoriesRoutes = require('./routes/categories')
const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')
const passportConfig = require('./config/passportConfig')
const { authenticateOptional } = require('./middlewares/authentication')

const { isProd, isDev } = require('./config')
const { PORT } = require('./config').app
const uploads =
  isProd || isDev ? serve('public/uploads') : serve('tests/data/uploads')

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
  flags: 'a',
})

const app = new Koa()
app
  .use(morgan('combined', { stream: accessLogStream }))
  .use(mount('/uploads', uploads))
  .use(bodyParser())
  .use(cors())
  .use(passport.initialize())

passportConfig(passport)

app
  .use(authenticateOptional)
  .use(indexRoutes.routes())
  .use(usersRoutes.routes())
  .use(categoriesRoutes.routes())
  .use(productsRoutes.routes())
  .use(ordersRoutes.routes())

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
