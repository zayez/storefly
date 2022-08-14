const bcrypt = require('bcrypt')

exports.seed = async (knex) => {
  await knex('roles').del()

  await knex('roles').insert([
    { name: 'admin' },
    { name: 'editor' },
    { name: 'customer' },
  ])

  await knex('users').del()

  await knex('userRoles').del()

  const userId = await knex('users').insert([
    {
      firstName: 'Joe',
      lastName: 'Doe',
      email: 'joedoe@google.com',
      password: await createHashedPassword(),
    },
  ])

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

  await knex('categories').insert({
    title: 'Cars',
  })

  await knex('categories').insert({
    title: 'Eletronics',
  })

  await knex('categories').insert({
    title: 'Books',
  })

  await knex('categories').insert({
    title: 'Clothes',
  })

  await knex('categories').insert({
    title: 'Drinks',
  })
}

async function createHashedPassword() {
  const salt = await bcrypt.genSalt(10)
  const password = '1234'
  const passwordHash = await bcrypt.hash(password, salt)
  return passwordHash
}
