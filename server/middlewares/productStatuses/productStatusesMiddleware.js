const { setResponse } = require('../../helpers/middlewareHelpers')
const ProductStatusesController = require('../../controllers/productStatuses')
const { isManager } = require('../../helpers/userHelpers')
const ActionStatus = require('../../types/ActionStatus')

const getAll = async (ctx) => {
  try {
    if (!isManager(ctx.state.user)) {
      setResponse(ctx, { action: ActionStatus.Forbidden })
      return
    }
    const { action, payload } = await ProductStatusesController.getAll()
    setResponse(ctx, { action, payload })
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

module.exports = {
  getAll,
}
