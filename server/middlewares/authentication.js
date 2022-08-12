const passport = require('passport')

const authenticateLocal = passport.authenticate('local', {
  session: false,
})
const authenticate = passport.authenticate('jwt', {
  session: false,
})

module.exports = {
  authenticate,
  authenticateLocal,
}
