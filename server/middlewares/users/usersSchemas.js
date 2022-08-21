const Joi = require('joi')

const Roles = require('../../types/Roles')

const User = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().trim().min(1).required(),
  roles: Joi.array().items(Joi.string().valid(...Roles)),
})

module.exports = {
  user: User,
}
