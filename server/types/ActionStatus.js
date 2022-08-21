const ActionStatus = {
  Ok: 'ok', // 200
  Created: 'created', // 201
  BadRequest: 'bad_request', // 400
  Forbidden: 'forbidden', // 403
  NotFound: 'not_found', // 404
  Conflict: 'conflict', // 409
  Unprocessable: 'Unprocessable', // 422
  Error: 'error', // 500
  CreateError: 'Create_Error', // 400 (generic error)
}

module.exports = ActionStatus
