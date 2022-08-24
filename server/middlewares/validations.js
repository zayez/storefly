const { setBodyError } = require('../helpers/middlewareHelpers')
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

function isValidBody({ ctx }, schema) {
  try {
    const result = schema.validate(ctx.request.body, {
      abortEarly: false,
    })
    if (result.error) {
      return {
        action: ActionStatus.Unprocessable,
        payload: { error: result.error },
      }
    }

    return { action: ActionStatus.Ok, payload: result.value }
  } catch (err) {
    ctx.throw(400, err.message)
  }
}

function isValidReference(column, tableName) {
  const Model = require('../models/entity')(tableName)
  return async function (ctx, next) {
    try {
      const id = ctx.request.body[column]
      if (!id) {
        return {
          action: ActionStatus.Ok,
        }
      }
      const foundReference = await Model.findById(id)

      if (!foundReference) {
        return {
          action: ActionStatus.Unprocessable,
          payload: { error: `${column} references inexistent entity.` },
        }
      }
      return {
        action: ActionStatus.Ok,
      }
    } catch (err) {
      setBodyError(ctx, err)
    }
  }
}

function isUnique(attr, entity) {
  const Entity = require('../models/entity')(entity)
  return async function (ctx) {
    try {
      const payload = {}
      payload[attr] = ctx.request.body[attr]
      const entityFound = await Entity.findOne(payload)

      if (entityFound) {
        return { action: ActionStatus.Conflict }
      }
      return {
        action: ActionStatus.Ok,
      }
    } catch (err) {
      setBodyError(ctx, err)
    }
  }
}

function itExists(entity) {
  const Entity = require('../models/entity')(entity)
  return async function (ctx) {
    try {
      const { id } = ctx.params
      const foundEntity = await Entity.findById(id)

      if (foundEntity) {
        return { action: ActionStatus.Ok, payload: foundEntity }
      }
      return { action: ActionStatus.NotFound }
    } catch (err) {
      setBodyError(ctx, err)
    }
  }
}

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
  validateFile,
  isValidBody,
  isValidReference,
  isUnique,
  itExists,
}
