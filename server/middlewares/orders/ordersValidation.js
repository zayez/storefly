const { validateBody } = require('../validations')
const { PlaceOrder } = require('./ordersSchema')

const validateOrder = async (ctx, next) => {
  await validateBody({ ctx, next }, PlaceOrder)
}

module.exports = {
  validateOrder,
}
