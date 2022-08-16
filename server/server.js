const fs = require('fs')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
const passport = require('koa-passport')
const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')
const categoriesRoutes = require('./routes/categories')
const productsRoutes = require('./routes/products')
const passportConfig = require('./config/passportConfig')

const { isDev, isProd } = require('./config')
const { PORT } = require('./config').app

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
  flags: 'a',
})

const app = new Koa()
app
  .use(morgan('combined', { stream: accessLogStream }))
  .use(bodyParser())
  .use(passport.initialize())

passportConfig(passport)

app
  .use(indexRoutes.routes())
  .use(usersRoutes.routes())
  .use(categoriesRoutes.routes())
  .use(productsRoutes.routes())

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
