const User = require('../../models/user')
const users = require('./data/users.json').users
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del()
  await knex('userRoles').del()

  for (const user of users) {
    await User.create(user, user.roles)
  }
}
