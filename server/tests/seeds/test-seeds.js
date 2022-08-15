const bcrypt = require('bcrypt')
const roles = require('../fixtures/roles.json').roles
const users = require('../fixtures/users.json').users
const categories = require('../fixtures/categories.json').categories

exports.seed = async (knex) => {
  await knex('roles').del()
  await knex('roles').insert(roles)
  await knex('users').del()
  await knex('userRoles').del()

  for (const user of users) {
    user.password = await createHashedPassword(user.password)
  }
  const userId = await knex('users').insert(users)

  const adminRole = await knex('roles')
    .select('id')
    .where('name', 'admin')
    .first()

  await knex('userRoles').insert([
    {
      userId,
      roleId: adminRole.id,
    },
  ])

  await knex('categories').del()
  await knex('categories').insert(categories[0])
  await knex('categories').insert(categories[1])
  await knex('categories').insert(categories[2])
  await knex('categories').insert(categories[3])
  await knex('categories').insert(categories[4])
}

async function createHashedPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  return passwordHash
}
