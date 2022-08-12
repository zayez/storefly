const bcrypt = require('bcrypt')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del()
  await knex('userRoles').del()

  const admin = await knex('roles').select('id').where('name', 'admin').first()

  const salt = await bcrypt.genSalt(10)
  const password = '1234'
  const passwordHash = await bcrypt.hash(password, salt)
  const user1 = await knex('users').insert([
    {
      firstName: 'Joe',
      lastName: 'Doe',
      email: 'joedoe@google.com',
      password: passwordHash,
    },
  ])

  const user1Roles = await knex('userRoles').insert([
    {
      userId: user1,
      roleId: admin.id,
    },
  ])
}
