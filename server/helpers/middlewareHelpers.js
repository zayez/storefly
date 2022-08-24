const ActionStatus = require('../types/ActionStatus')

function setBody({ ctx, action, payload }) {
  const { code, title, message } = getResponse(action)
  ctx.response.status = code
  ctx.response.body = { title, message }
  ctx.response.body = { ...ctx.body, ...payload }
}

function setBodyError(ctx, err) {
  const { code, title, message } = getResponse(ActionStatus.Error)
  ctx.response.status = code
  ctx.response.body = {
    title: title,
    message: message,
    error: {
      name: err.name,
      message: err.message,
    },
  }
}

function getResponse(action) {
  let code, title, message
  switch (action) {
    case ActionStatus.Ok:
      code = 200
      title = 'Ok'
      message = 'The request has succeeded'
      break
    case ActionStatus.Created:
      code = 201
      title = 'Created'
      message = 'The request has succeeded and a new resource has been created'
      break

    case ActionStatus.BadRequest:
      code = 400
      title = 'Bad Request'
      message =
        'The server could not understand the request due to invalid syntax.'
      break
    case ActionStatus.Forbidden:
      code = 403
      title = 'Forbidden'
      message = 'The client does not have access rights to the content'
      break

    case ActionStatus.Conflict:
      code = 409
      title = 'Conflict'
      message = 'The request conflicts with the current state of the server'
      break
    case ActionStatus.Unprocessable:
      code = 422
      title = 'Unprocessable'
      message = 'The request was unable to process the contained entity'
      break
    case ActionStatus.Error:
      code = 500
      title = 'Error'
      message = 'Internal server error'
      break
    case ActionStatus.CreateError:
      code = 400
      title = 'Create - failed to create'
      message = 'The server was unable to insert the data.'
      break
    default:
      code = 404
      title = 'Not Found'
      message = 'The server can not find the requested resource.'
      break
  }

  return { code, title, message }
}

module.exports = {
  setBody,
  setBodyError,
  getResponse,
}
