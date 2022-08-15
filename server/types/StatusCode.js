const StatusCode = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  Unprocessable: 422,
  Error: 500,
  SignUpError_UpdateUserFailed: 500,
  SignUpError_CreateUserFailed: 500,
  SignUpError_CleanupUserFailed: 500,
  SignUpError_CleanupUserSucceded: 500,
}

module.exports = StatusCode
