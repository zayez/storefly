const Joi = require('joi')

const Roles = require('../../types/Roles')

const create = Joi.object().keys({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  password: Joi.string().trim().min(1).required(),
  roles: Joi.array().items(Joi.string().valid(...Roles)),
})

const update = Joi.object().keys({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().trim(),
  password: Joi.string().trim(),
})

module.exports = {
  create,
  update,
}
