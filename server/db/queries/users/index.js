const knex = require('../../connection')
const bcrypt = require('bcrypt')
const { format, parseISO } = require('date-fns')

async function userHasRole(user, role) {
  const userRoles = await knex('roles').whereIn(
    'id',
    knex('userRoles').select('roleId').where('userId', user.id),
  )

  return userRoles.some((p) => p.name === role)
}

async function findUserById(id) {
  const retUser = await knex('users').select('*').where('id', id).first()
  return retUser
}

async function findUserByEmail(email) {
  const retUser = await knex('users').select('*').where('email', email).first()
  return retUser
}

async function matchPassword(email, password) {
  const user = await knex('users').select('*').where('email', email).first()

  try {
    return await bcrypt.compare(password, user.password)
  } catch (err) {
    throw err
  }
}

async function createUser(user, roles = ['customer']) {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(user.password, salt)
  const newUser = {
    email: user.email,
    password: passwordHash,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const userId = await knex('users').insert(newUser)
  const createdUser = await findUserById(userId)

  const selectedRoles = await knex('roles').select('id').whereIn('name', roles)

  for (const role of selectedRoles) {
    await knex('userRoles').insert([{ userId, roleId: role.id }])
  }

  return createdUser
}

async function clearUsers(createdAfter) {
  const time = format(parseISO(createdAfter), 'yyyy-MM-dd HH:mm:ss')

  const users = await knex('users')
    .select('id')
    .where('created_at', '>=', `${time}`)

  const usersId = users.map((u) => u.id)

  await knex('userRoles').whereIn('userId', usersId).del()
  await knex('users').whereIn('id', usersId).del()
}

module.exports = {
  userHasRole,
  findUserById,
  findUserByEmail,
  matchPassword,
  createUser,
  clearUsers,
}
