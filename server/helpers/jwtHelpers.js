const jwt = require('jsonwebtoken')
const { SECRET, TOKEN_EXPIRES_IN } = require('../config').jwt

const signToken = (sub) => {
  return jwt.sign(
    {
      iss: 'storefly',
      sub,
    },
    SECRET,
    {
      expiresIn: TOKEN_EXPIRES_IN,
    },
  )
}

module.exports = { signToken }
