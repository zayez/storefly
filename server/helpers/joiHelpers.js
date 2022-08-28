/**
 * Formats joi validation error details into a Problem Details JSON response.
 * See: https://www.rfc-editor.org/rfc/rfc7807#section-3
 * @param {array} details joi error details
 * @returns problem json details object
 */
const formatValidations = (validationErrors) => {
  const errors = {}
  errors['invalid-params'] = validationErrors.map((item) => {
    return {
      name: item.path[0],
      reason: item.message.replace('/', ''),
    }
  })

  return errors
}

module.exports = {
  formatValidations,
}
