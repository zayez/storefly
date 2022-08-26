const Joi = require('joi')

const OrderItem = Joi.object().keys({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
})

const PlaceOrder = Joi.object().keys({
  items: Joi.array().items(OrderItem).required(),
  dateOrder: Joi.date(),
})

const GetAllByUser = Joi.object().keys({
  userId: Joi.number().integer().required(),
})

const GetOneByUser = Joi.object().keys({
  userId: Joi.number().integer().required(),
  orderId: Joi.number().integer().required(),
})

module.exports = {
  PlaceOrder,
  GetAllByUser,
  GetOneByUser,
}
