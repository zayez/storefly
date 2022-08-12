const path = require('path')
require('dotenv').config()
const dbDir = 'data'
const dbName = 'storefly-db.db'

const BASE_PATH = path.join(__dirname, 'db')

const filenameDev = path.join(__dirname, dbDir, 'development', dbName)
const filenameTest = path.join(__dirname, dbDir, 'test', dbName)

module.exports = {
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: filenameTest,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: filenameDev,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '4002',
      database: process.env.DB_NAME || 'storefly-db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
    },
  },
}
