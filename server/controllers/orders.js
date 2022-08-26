const path = require('path')
const order = require('../models/order')
const controllerName = path.parse(__filename).name
const controller = require('../helpers/controllerHelper')(controllerName)
const Order = require('../models/order')
const ActionStatus = require('../types/ActionStatus')
const mapper = require('../helpers/propsMapper').output

const placeOrder = async (order, userId) => {
  try {
    const savedOrder = await Order.create(order, userId)

    if (savedOrder) {
      return {
        action: ActionStatus.Created,
        payload: { order: mapper.mapOrder(savedOrder) },
      }
    }
    return {
      action: ActionStatus.CreateError,
    }
  } catch (err) {
    throw err
  }
}

const getAllByUser = async (id) => {
  try {
    const orders = await Order.find({ userId: id })
    if (orders) {
      return {
        action: ActionStatus.Ok,
        payload: { orders: orders.map(mapper.mapOrder) },
      }
    }
    return {
      action: ActionStatus.Error,
    }
  } catch (err) {
    throw err
  }
}

const getOneByUser = async ({ orderId, userId }) => {
  try {
    const order = await Order.findOneByUser({ orderId, userId })
    if (order) {
      return {
        action: ActionStatus.Ok,
        payload: { order: mapper.mapOrder(order) },
      }
    }
    return {
      action: ActionStatus.Error,
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  placeOrder,
  getAllByUser,
  getOneByUser,
}
