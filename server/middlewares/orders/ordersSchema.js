const Joi = require('joi')

const OrderItem = Joi.object().keys({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().required(),
  price: Joi.number().precision(2).positive().required(),
  total: Joi.number().precision(2).positive().required(),
  subtotal: Joi.number().precision(2).positive().required(),
})

const Order = Joi.object().keys({
  items: Joi.array().items(OrderItem).required(),
  dateOrder: Joi.date(),
  total: Joi.number().precision(2).positive().required(),
  subtotal: Joi.number().precision(2).positive().required(),
  paymentStatus: Joi.string()
    .valid(...['paid', 'unpaid'])
    .required(),
})

const ShippingAddress = Joi.object().keys({
  addressLine1: Joi.string().trim().required(),
  addressLine2: Joi.string().allow(null, ''),
  city: Joi.string().trim().required(),
  country: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  postalCode: Joi.number().integer().required(),
})

const PlaceOrder = Joi.object().keys({
  order: Order.required(),
  shippingAddress: ShippingAddress.required(),
})

const GetAllByUser = Joi.object().keys({
  userId: Joi.number().integer().required(),
})

const GetOneByUser = Joi.object().keys({
  userId: Joi.number().integer().required(),
  orderId: Joi.number().integer().required(),
})

const GetAll = Joi.object().keys({
  page: Joi.number(),
})

module.exports = {
  PlaceOrder,
  GetAllByUser,
  GetOneByUser,
  GetAll,
}
