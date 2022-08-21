const ActionStatus = require('../types/ActionStatus')

const getRoot = async () => {
  return {
    action: ActionStatus.Ok,
    payload: { greeting: 'hella!' },
  }
}

module.exports = {
  getRoot,
}
