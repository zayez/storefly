const jwt = require('jsonwebtoken')
const ActionStatus = require('../types/ActionStatus')
const { SECRET, TOKEN_EXPIRES_IN } = require('../config').jwt
const User = require('../models/user')

async function signUp(user, roles) {
  try {
    const savedUser = await User.create(user, roles)

    if (savedUser) {
      const token = signToken(savedUser)
      return {
        action: ActionStatus.Created,
        payload: { token },
      }
    } else {
      return {
        action: ActionStatus.SignUpError_CreateUserFailed,
      }
    }
  } catch (err) {
    throw err
  }
}

async function signIn(user) {
  const token = signToken(user)
  return { action: ActionStatus.Ok, payload: { token } }
}

function signToken(user) {
  return jwt.sign(
    {
      iss: 'storefly',
      sub: user.id,
    },
    SECRET,
    {
      expiresIn: TOKEN_EXPIRES_IN,
    },
  )
}

module.exports = { signUp, signIn }
