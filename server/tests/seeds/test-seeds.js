const roles = require('../../db/seeds/data/roles.json').roles
const productStatuses =
  require('../../db/seeds/data/productStatuses.json').productStatuses
const admins = require('../fixtures/users.json').admins
const editors = require('../fixtures/users.json').editors
const customers = require('../fixtures/users.json').customers
const categories = require('../fixtures/categories.json').categories
const products = require('../fixtures/products.json').products
const User = require('../../models/user')
const Category = require('../../models/category')
const Product = require('../../models/product')

const users = [...admins, ...editors, ...customers]

exports.seed = async (knex) => {
  await knex('roles').del()
  await knex('roles').insert(roles)
  await knex('users').del()
  await knex('userRoles').del()

  for (const user of users) {
    await User.create(user, user.roles)
  }

  await knex('categories').del()
  for (const category of categories) {
    await Category.create(category)
  }
  await knex('productStatus').del()
  await knex('productStatus').insert(productStatuses[0])
  await knex('productStatus').insert(productStatuses[1])

  await Product.destroyAll()

  for (const product of products) {
    await Product.create(product)
  }
}
