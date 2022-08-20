const knex = require('../db')
const bcrypt = require('bcrypt')

const TABLE_NAME = 'users'
const SELECTABLE_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'updatedAt',
  'createdAt',
]

const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)

const getUserRoles = async (id) => {
  return await knex('roles').whereIn(
    'id',
    knex('userRoles').select('roleId').where('userId', id),
  )
}

async function hasRole(user, roles = []) {
  const userRoles = await getUserRoles(user.id)
  return userRoles.some((r) => roles.includes(r.name))
}

async function matchPassword(email, password) {
  const user = await knex('users').select('*').where('email', email).first()

  try {
    return await bcrypt.compare(password, user.password)
  } catch (err) {
    throw err
  }
}

async function create(user, roles = ['customer']) {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(user.password, salt)
  const newUser = {
    email: user.email,
    password: passwordHash,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const userId = await knex('users').insert(newUser)
  const createdUser = await queries.findById(userId)

  const selectedRoles = await knex('roles').select('id').whereIn('name', roles)

  for (const role of selectedRoles) {
    await knex('userRoles').insert([{ userId, roleId: role.id }])
  }

  return createdUser
}

module.exports = {
  hasRole,
  matchPassword,
  ...queries,
  create,
}
