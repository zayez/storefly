const path = require('path')
const controllerName = path.parse(__filename).name
const controller = require('../helpers/controllerHelper')(controllerName)

const ActionStatus = require('../types/ActionStatus')
const User = require('../models/user')
const mapper = require('../helpers/propsMapper').output

const create = async (user, roles) => {
  try {
    const savedUser = await User.create(user, roles)

    if (savedUser) {
      return {
        action: ActionStatus.Created,
        payload: mapper.mapUser(savedUser),
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
  ...controller,
  create,
}
