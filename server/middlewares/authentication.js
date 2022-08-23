const passport = require('passport')

const authenticateLocal = passport.authenticate('local', {
  session: false,
})
const authenticate = passport.authenticate('jwt', {
  session: false,
})

const authenticateOptional = passport.authenticate(['jwt', 'anonymous'], {
  session: false,
})

module.exports = {
  authenticateLocal,
  authenticate,
  authenticateOptional,
}
