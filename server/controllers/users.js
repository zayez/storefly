const path = require('path')
const controllerName = path.parse(__filename).name
const controller = require('../helpers/controllerHelper')(controllerName)

const ActionStatus = require('../types/ActionStatus')
const User = require('../models/user')
const { signToken } = require('../helpers/jwtHelpers')

const create = async (user, roles) => {
  try {
    const savedUser = await User.create(user, roles)

    if (savedUser) {
      const token = signToken(savedUser)
      return {
        action: ActionStatus.Created,
        payload: { token },
      }
    }
    return {
      action: ActionStatus.SignUpError_CreateUserFailed,
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  ...controller,
  create,
}
