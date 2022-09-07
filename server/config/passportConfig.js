const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const AnonymousStrategy = require('passport-anonymous').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { fromExtractors, fromHeader } = ExtractJwt
const { SECRET } = require('../config').jwt
const User = require('../models/user')

const cookieExtractor = (req) => {
  let token = null
  if (req && req.header.cookie) {
    token = req.header.cookie.replace('token=', '')
  }
  return token
}

const opts = {}
opts.jwtFromRequest = fromExtractors([
  cookieExtractor,
  fromHeader('authorization'),
])
opts.secretOrKey = SECRET

function passportConfig(passport) {
  // JWT passport
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findById(payload.sub)
        if (!user) {
          return done(null, false)
        }
        done(null, user)
      } catch (err) {
        done(err, false)
      }
    }),
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
