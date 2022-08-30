const ActionStatus = require('../types/ActionStatus')
const SuccessStatuses = [ActionStatus.Ok, ActionStatus.Created]

/**
 * Sets the response based on the action with the payload.
 * @param {Koa.ParameterizedContext} ctx context
 * @param {Object} obj
 * @param {ActionStatus} obj.action action type
 * @param {Object} obj.payload payload
 */
function setResponse(ctx, { action, payload }) {
  if (SuccessStatuses.includes(action)) {
    const status = getResponse(action)
    ctx.response.status = status
    ctx.response.body = payload
  } else {
    const { status, title, detail } = getResponseError(action)
    ctx.response.status = status
    ctx.response.body = { status, title, detail }
    if (payload) ctx.response.body = { ...ctx.response.body, ...payload }
  }
  const contentType = getContentType(action)
  ctx.set('Content-Type', contentType)
}

function getContentType(action) {
  const type =
    action === ActionStatus.Unprocessable
      ? 'application/problem+json'
      : 'application/json'
  return type
}

function getResponse(action) {
  let status
  switch (action) {
    case ActionStatus.Ok:
      status = 200
      break
    case ActionStatus.Created:
      status = 201
      break
    default:
      status = 200
      break
  }
  return status
}

function getResponseError(action) {
  let status, title, detail
  switch (action) {
    case ActionStatus.BadRequest:
      status = 400
      title = 'Bad Request'
      detail =
        'The server could not understand the request due to invalid syntax.'
      break
    case ActionStatus.Unauthorized:
      status = 401
      title = 'Unauthorized'
      detail =
        'The request lacks valid authentication credentials for the requested resource.'
      break
    case ActionStatus.Forbidden:
      status = 403
      title = 'Forbidden'
      detail = 'The client does not have access rights to the content'
      break

    case ActionStatus.Conflict:
      status = 409
      title = 'Conflict'
      detail = 'The request conflicts with the current state of the server'
      break
    case ActionStatus.Unprocessable:
      status = 422
      title = 'Unprocessable'
      detail = 'The request was unable to process the contained entity'
      break
    case ActionStatus.Error:
      status = 500
      title = 'Internal server error'
      detail = 'A fatal error occured'
      break
    case ActionStatus.CreateError:
      status = 400
      title = 'Create - failed to create'
      detail = 'The server was unable to insert the data.'
      break
    default:
      status = 404
      title = 'Not Found'
      detail = 'The server can not find the requested resource.'
      break
  }

  return { status, title, detail }
}

module.exports = {
  setResponse,
}
