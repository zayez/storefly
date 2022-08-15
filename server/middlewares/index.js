const { userExists } = require('./verify')
const authorization = require('./authorization')

module.exports = {
  authorization,
  verifySignUp: { userExists },
}
