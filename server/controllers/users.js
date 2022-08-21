const ActionStatus = require('../types/ActionStatus')
const User = require('../models/user')
const { signToken } = require('../helpers/jwtHelpers')

async function signUp(user, roles) {
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

async function signIn(user) {
  const token = signToken(user.id)
  return { action: ActionStatus.Ok, payload: { token } }
}

module.exports = { signUp, signIn }
