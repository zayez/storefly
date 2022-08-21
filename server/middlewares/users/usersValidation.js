const { validateBody } = require('../validations')
const { user } = require('./usersSchemas')

const isValidUser = async (ctx, next) => await validateBody({ ctx, next }, user)

module.exports = {
  isValidUser,
}
