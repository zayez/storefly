const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const AnonymousStrategy = require('passport-anonymous').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { SECRET } = require('../config').jwt
const User = require('../models/user')
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
          const user = await User.findById(payload.sub)
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
          const user = await User.findOne({ email })
          if (!user) {
            return done(null, false)
          }

          const isPasswordMatch = await User.matchPassword(email, password)

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

  // Anonymous passport
  passport.use(new AnonymousStrategy())
}

module.exports = passportConfig
