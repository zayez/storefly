/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del()
  await knex('userRoles').del()

  const admin = await knex('roles').select('id').where('name', 'admin').first()
  const user1 = await knex('users').insert([
    {
      firstName: 'Joe',
      lastName: 'Doe',
      email: 'joedoe@google.com',
      password: '1234',
    },
  ])

  const user1Roles = await knex('userRoles').insert([
    {
      userId: user1,
      roleId: admin.id,
    },
  ])
}
