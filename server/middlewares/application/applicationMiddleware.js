const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const ApplicationController = require('../../controllers/application')

const getRoot = async (ctx) => {
  try {
    const { action, payload } = await ApplicationController.getRoot()
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

module.exports = {
  getRoot,
}
