const path = require('path')
const fs = require('fs')

const env = process.env.NODE_ENV

const envPath = path.resolve(process.cwd(), `.env.${env}`)
const defaultEnvPath = path.resolve(process.cwd(), '.env')

require('dotenv').config({
  path: fs.existsSync(envPath) ? envPath : defaultEnvPath,
})

const {
  APP_PORT,
  APP_ITEMS_PER_PAGE,
  APP_COLLECTIONS_MIN_SIZE,
  APP_COLLECTIONS_MAX_SIZE,
  APP_IMAGE_MAX_SIZE_MB,
} = process.env
const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } = process.env
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

const config = {
  isDev: env === 'dev' || env === 'development',
  isProd: env === 'production' || env === 'prod',
  app: {
    PORT: APP_PORT || 3333,
    ITEMS_PER_PAGE: APP_ITEMS_PER_PAGE || 25,
    COLLECTIONS_MIN_SIZE: Number(APP_COLLECTIONS_MIN_SIZE) || 1,
    COLLECTIONS_MAX_SIZE: Number(APP_COLLECTIONS_MAX_SIZE) || 50,
    IMAGE_MAX_SIZE_MB: Number(APP_IMAGE_MAX_SIZE_MB) || 2,
  },

  db: {
    host: DB_HOST || 'localhost',
    port: parseInt(DB_PORT) || 22222,
    name: DB_NAME || 'storefly-db',
    user: DB_USER || 'root',
    password: DB_PASS || 'root',
  },

  jwt: {
    SECRET: JWT_SECRET || 'secret-key',
    TOKEN_EXPIRES_IN: JWT_EXPIRES_IN || '10min',
  },
}

module.exports = config
