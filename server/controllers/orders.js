const path = require('path')
const controllerName = path.parse(__filename).name
const controller = require('../helpers/controllerHelper')(controllerName)
const Order = require('../models/order')
const ActionStatus = require('../types/ActionStatus')

const placeOrder = async (order, userId) => {
  try {
    const savedOrder = await Order.create(order, userId)

    if (savedOrder) {
      return {
        action: ActionStatus.Created,
        payload: { order: savedOrder },
        // payload: { order: mapper.mapUser(savedOrder) },
      }
    }
    return {
      action: ActionStatus.CreateError,
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  placeOrder,
}
