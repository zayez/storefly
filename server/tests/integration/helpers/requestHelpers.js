/**
 *
 * @param {string} token token
 * @param {Object[]} headers headers to set
 * @returns {Object[]} headers
 */
const setHeaders = (token, headers) => {
  const newHeaders = headers ? headers : {}
  if (!headers) newHeaders['Accept'] = 'application/json'
  if (token) newHeaders['Authorization'] = token
  return newHeaders
}

/**
 * Debug response body in case response status does not match with expected status
 * @param {Response} res response
 * @param {STATUS} expectedStatus expected status
 */
const debugStatus = async (res, expectedStatus) => {
  if (res.status !== expectedStatus) {
    console.log(JSON.stringify(res.body, null, 2))
  }
}

module.exports = {
  setHeaders,
  debugStatus,
}
