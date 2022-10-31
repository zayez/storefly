const ActionStatus = require('../types/ActionStatus')
const User = require('../models/user')
const { signToken } = require('../helpers/jwtHelpers')

const getRoot = async () => {
  return {
    action: ActionStatus.Ok,
    payload: { greeting: 'hella!' },
  }
}

async function signUp(user) {
  const roles = ['customer']
  try {
    const savedUser = await User.create(user, roles)

    if (savedUser) {
      const token = signToken(savedUser.id)
      return {
        action: ActionStatus.Created,
        payload: { token, user: savedUser },
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

module.exports = {
  getRoot,
  signIn,
  signUp,
}
