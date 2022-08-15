const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { SECRET } = require('../config').jwt
const {
  findUserById,
  matchPassword,
  findUserByEmail,
} = require('../models/user')
function passportConfig(passport) {
  // JWT passport
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: SECRET,
      },
      async (payload, done) => {
        try {
          const user = await findUserById(payload.sub)
          if (!user) {
            return done(null, false)
          }
          done(null, user)
        } catch (err) {
          done(err, false)
        }
      },
    ),
  )

  // Local passport
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (email, password, done) => {
        try {
          const user = await findUserByEmail(email)
          if (!user) {
            return done(null, false)
          }

          const isPasswordMatch = await matchPassword(email, password)

          if (!isPasswordMatch) {
            return done(null, false)
          }

          done(null, user)
        } catch (err) {
          done(err, false)
        }
      },
    ),
  )
}

module.exports = passportConfig
