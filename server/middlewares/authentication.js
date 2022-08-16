const passport = require('passport')

const authenticateLocal = passport.authenticate('local', {
  session: false,
})
const authenticateJwt = passport.authenticate('jwt', {
  session: false,
})

const authenticate = passport.authenticate(['jwt', 'anonymous'], {
  session: false,
})

module.exports = {
  authenticateLocal,
  authenticateJwt,
  authenticate,
}
