const Joi = require('joi')

const Create = Joi.object().keys({
  title: Joi.string().required(),
})

const Update = Joi.object().keys({
  title: Joi.string().required(),
})

const GetAll = Joi.object().keys({
  page: Joi.number(),
})

module.exports = {
  Create,
  Update,
  GetAll,
}
