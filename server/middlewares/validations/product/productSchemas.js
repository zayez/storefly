const Joi = require('joi')
const { COLLECTIONS_MIN_SIZE, COLLECTIONS_MAX_SIZE } =
  require('../../../config').app

const create = Joi.object().keys({
  title: Joi.string().trim().required(),
  description: Joi.string().trim(),
  price: Joi.number().precision(2).required(),
  inventory: Joi.number().integer().required(),
  image: Joi.string().trim(),
  statusId: Joi.number().integer(),
  categoryId: Joi.number().integer(),
})

const createCollection = Joi.object().keys({
  products: Joi.array()
    .min(COLLECTIONS_MIN_SIZE)
    .max(COLLECTIONS_MAX_SIZE)
    .items(create)
    .required()
    .unique('title'),
})

const update = Joi.object().keys({
  title: Joi.string().trim(),
  description: Joi.string().trim(),
  price: Joi.number().precision(2),
  inventory: Joi.number().integer(),
  image: Joi.string().trim(),
  statusId: Joi.number().integer(),
  categoryId: Joi.number().integer(),
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

const schemas = {
  create,
  createCollection,
  update,
  destroy,
  get,
  getAll,
}

module.exports = schemas
