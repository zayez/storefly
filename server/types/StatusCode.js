/**
 * Enum for response status code.
 * @readonly
 * @enum {integer}
 */
const StatusCode = {
  /** @member {integer} */
  Ok: 200,
  /** @member {integer} */
  Created: 201,
  /** @member {integer} */
  BadRequest: 400,
  /** @member {integer} */
  Forbidden: 403,
  /** @member {integer} */
  NotFound: 404,
  /** @member {integer} */
  Conflict: 409,
  /** @member {integer} */
  Unprocessable: 422,
  /** @member {integer} */
  Error: 500,
  /** @member {integer} */
  SignUpError_UpdateUserFailed: 500,
  /** @member {integer} */
  SignUpError_CreateUserFailed: 500,
  /** @member {integer} */
  SignUpError_CleanupUserFailed: 500,
  /** @member {integer} */
  SignUpError_CleanupUserSucceded: 500,
}

module.exports = StatusCode
