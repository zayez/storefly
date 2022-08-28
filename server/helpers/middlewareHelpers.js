const ActionStatus = require('../types/ActionStatus')

/**
 * Sets the response based on the action with the payload.
 * @param {Koa.ParameterizedContext} ctx context
 * @param {Object} obj
 * @param {ActionStatus} obj.action action type
 * @param {Object} obj.payload payload
 */
function setResponse(ctx, { action, payload }) {
  const { title, status, detail } = getResponse(action)
  const contentType = getContentType(action)
  ctx.response.status = status
  ctx.response.body = { title, status, detail }
  ctx.response.body = { ...ctx.body, ...payload }
  ctx.set('Content-Type', contentType)
}

function setResponseError(ctx, { error }) {
  const { title, status, detail } = getResponse(ActionStatus.Error)
  ctx.response.status = status
  ctx.response.body = {
    title,
    status,
    detail,
  }
}

function getContentType(action) {
  const type =
    action === ActionStatus.Unprocessable
      ? 'application/problem+json'
      : 'application/json'
  return type
}

function getResponse(action) {
  let status, title, detail
  switch (action) {
    case ActionStatus.Ok:
      status = 200
      title = 'Ok'
      detail = 'The request has succeeded'
      break
    case ActionStatus.Created:
      status = 201
      title = 'Created'
      detail = 'The request has succeeded and a new resource has been created'
      break

    case ActionStatus.BadRequest:
      status = 400
      title = 'Bad Request'
      detail =
        'The server could not understand the request due to invalid syntax.'
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
  setResponseError,
  getResponse,
}
