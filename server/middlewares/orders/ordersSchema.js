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
  id: Joi.number().integer().required(),
})

module.exports = {
  PlaceOrder,
  GetAllByUser,
}
