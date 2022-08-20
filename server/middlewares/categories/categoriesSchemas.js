const Joi = require('joi')

const create = Joi.object().keys({
  title: Joi.string().required(),
})

const update = Joi.object().keys({
  title: Joi.string().required(),
})

const destroy = Joi.object().keys({
  id: Joi.number(),
})

const get = Joi.object().keys({
  id: Joi.number().required(),
})

const getAll = Joi.object().keys({
  page: Joi.number(),
})

module.exports = {
  create,
  update,
  destroy,
  get,
  getAll,
}
