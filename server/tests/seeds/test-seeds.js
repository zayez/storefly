const roles = require('../fixtures/roles.json').roles
const users = require('../fixtures/users.json').users
const categories = require('../fixtures/categories.json').categories
const productStatuses =
  require('../fixtures/productStatuses.json').productStatuses

const User = require('../../models/user')
const Category = require('../../models/category')
const Product = require('../../models/product')

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
}
