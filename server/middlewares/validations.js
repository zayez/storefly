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

async function validateFile({ ctx, next }, schema) {
  try {
    const result = schema.validate(ctx.request.file, {
      abortEarly: false,
    })
    if (result.error) {
      ctx.response.status = 400
      ctx.response.body = result.error
      return
    }

    ctx.request.file = result.value
    return await next()
  } catch (err) {
    ctx.throw(400, err.message)
  }
}

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
  validateFile,
}
