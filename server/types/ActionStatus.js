const ActionStatus = {
  Ok: 'ok', // 200
  Created: 'created', // 201
  BadRequest: 'bad_request', // 400
  Forbidden: 'forbidden', // 403
  NotFound: 'not_found', // 404
  Conflict: 'conflict', // 409
  Unprocessable: 'Unprocessable', // 422
  Error: 'error', // 500
  SignUpError_UpdateUserFailed: 'SignUpError_UpdateUserFailed', // 500
  SignUpError_CreateUserFailed: 'SignUpError_CreateUserFailed', // 500
  SignUpError_CleanupUserFailed: 'SignUpError_CleanupUserFailed', // 500
  SignUpError_CleanupUserSucceded: 'SignUpError_CleanupUserSucceded', // 500
}

module.exports = ActionStatus
