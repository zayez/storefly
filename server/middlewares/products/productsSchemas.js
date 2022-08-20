const Joi = require('joi')
const { COLLECTIONS_MIN_SIZE, COLLECTIONS_MAX_SIZE, IMAGE_MAX_SIZE_MB } =
  require('../../config').app

const IMAGE_MAX_SIZE = 1024 * (1024 * IMAGE_MAX_SIZE_MB)

const create = Joi.object().keys({
  title: Joi.string().trim().required(),
  description: Joi.string().trim(),
  price: Joi.number().precision(2).required(),
  inventory: Joi.number().integer().required(),
  statusId: Joi.number().integer(),
  categoryId: Joi.number().integer(),
})

const uploadImage = Joi.object()
  .keys({
    mimetype: Joi.string().valid(...['image/png', 'image/jpeg']),
    path: Joi.string().trim().required(),
    size: Joi.number()
      .integer()
      .required()
      .max(IMAGE_MAX_SIZE)
      .messages({
        'number.max': `"size" should have a max length of ${IMAGE_MAX_SIZE_MB} MB (${IMAGE_MAX_SIZE} bytes)`,
      }),
  })
  .options({ allowUnknown: true })

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
  uploadImage,
}

module.exports = schemas
