const path = require('path')
require('dotenv').config()

const dbName = 'storefly-db'
const dbDev = path.join(__dirname, `data`, `${dbName}-dev.db`)
const dbTest = path.join(__dirname, `data`, `${dbName}-test.db`)

const BASE_PATH = path.join(__dirname, 'db')

module.exports = {
  test: {
    client: 'sqlite3',
    debug: false,
    useNullAsDefault: true,
    connection: {
      filename: dbTest,
      timezone: 'UTC',
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 500 },
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
      filename: dbDev,
      timezone: 'UTC',
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
      database: process.env.DB_NAME || dbName,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      timezone: 'UTC',
    },
  },
}
