const ActionStatus = require('../types/ActionStatus')

async function validateBody({ ctx, next }, schema) {
  try {
    const result = schema.validate(ctx.request.body, {
      abortEarly: false,
    })
    if (result.error) {
      ctx.response.status = 400
      ctx.response.body = result.error
      return
    }

    ctx.request.body = result.value
    return await next()
  } catch (err) {
    ctx.throw(400, err.message)
  }
}

async function validateQuery({ ctx, next }, schema) {
  try {
    const result = schema.validate(ctx.request.query, {
      abortEarly: false,
    })
    if (result.error) {
      ctx.response.status = 400
      ctx.response.body = result.error
      return
    }

    ctx.request.body = result.value
    return await next()
  } catch (err) {
    ctx.throw(400, err.message)
  }
}

async function validateParams({ ctx, next }, schema) {
  try {
    const result = schema.validate(ctx.params, {
      abortEarly: false,
    })
    if (result.error) {
      ctx.response.status = 400
      ctx.response.body = result.error
      return
    }

    ctx.request.body = result.value
    return await next()
  } catch (err) {
    ctx.throw(400, err.message)
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
    case ActionStatus.SignUpError_CreateUserFailed:
      code = 500
      title = 'SignUp - Create user failed'
      message = 'The server was unable to create the user'
      break
    case ActionStatus.SignUpError_CleanupUserFailed:
      code = 500
      title = 'SignUp - Remove imcomplete signUp failed'
      message = 'The server was unable to properly remove incomplete signUp'
      break
    case ActionStatus.SignUpError_CleanupUserSucceded:
      code = 500
      title = 'SignUp - Remove imcomplete signUp succeded'
      message = 'The server was unable to complete the signUp'
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
  validateBody,
  validateQuery,
  validateParams,
  getResponse,
}
