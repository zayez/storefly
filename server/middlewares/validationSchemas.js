const Joi = require('joi')

const Roles = require('../types/Roles')

const Id = Joi.object().keys({
  id: Joi.string().required(),
})

const SignUp = Joi.object().keys({
  email: Joi.string().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  password: Joi.string().trim().min(1).required(),
})

const SignIn = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().trim().min(1).required(),
})

const User = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().trim().min(1).required(),
  roles: Joi.array().items(Joi.string().valid(...Roles)),
})

const schemas = {
  signUp: SignUp,
  signIn: SignIn,
  user: User,
  id: Id,
}

module.exports = {
  schemas,
}
