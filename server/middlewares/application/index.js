const compose = require('koa-compose')
const { setBody, setBodyError } = require('../../helpers/middlewareHelpers')
const Application = require('../../controllers/application')

const getRoot = async (ctx) => {
  try {
    const { action, payload } = await Application.getRoot()
    setBody({ ctx, action, payload })
  } catch (err) {
    setBodyError(ctx, err)
  }
}

const pipelineGetRoot = compose([getRoot])

module.exports = {
  getRoot: pipelineGetRoot,
}
