const knex = require('../db')
const bcrypt = require('bcrypt')

const TABLE_NAME = 'users'
const SELECTABLE_FIELDS = [
  'id',
  'email',
  'password',
  'firstName',
  'lastName',
  'updatedAt',
  'createdAt',
]

const queries = require('../lib/queryBuilder')(TABLE_NAME, SELECTABLE_FIELDS)

const hashPassword = async (password, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
  } catch (err) {
    throw err
  }
}

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

async function comparePassword(password, encryptedPassword) {
  try {
    return await bcrypt.compare(password, encryptedPassword)
  } catch (err) {
    throw err
  }
}

async function create(user, roles = ['customer']) {
  const hashedPassword = await hashPassword(user.password)
  const newUser = {
    email: user.email,
    password: hashedPassword,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const userId = await knex('users').insert(newUser)
  if (!userId) return null

  const createdUser = await queries.findById(userId)
  const selectedRoles = await knex('roles').select('id').whereIn('name', roles)

  for (const role of selectedRoles) {
    await knex('userRoles').insert([{ userId, roleId: role.id }])
  }

  const createdUserRoles = await getUserRoles(createdUser.id)
  createdUser.roles = createdUserRoles.map((r) => r.name)
  return createdUser
}

const update = async (id, props = {}) => {
  if (props.password) {
    const hashedPassword = await hashPassword(props.password)
    props.password = hashedPassword
  }
  await knex(TABLE_NAME).update(props).where({ id })
  return await findById(id)
}

const findOne = async (filters) => {
  const user = await knex(TABLE_NAME).first(SELECTABLE_FIELDS).where(filters)
  if (!user) return null

  const roles = await getUserRoles(user.id)
  user.roles = roles.map((r) => r.name)
  return user
}

const findById = async (id) => {
  const user = await knex(TABLE_NAME).first(SELECTABLE_FIELDS).where({ id })
  if (!user) return null

  const roles = await getUserRoles(user.id)
  user.roles = roles.map((r) => r.name)
  return user
}

module.exports = {
  ...queries,
  hasRole,
  matchPassword,
  comparePassword,
  create,
  update,
  findOne,
  findById,
}
