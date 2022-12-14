const { setResponse } = require('../helpers/middlewareHelpers')
const ActionStatus = require('../types/ActionStatus')
const User = require('../models/user')

async function userExists(ctx, next) {
  try {
    const { email } = ctx.request.body
    const foundUser = await User.findOne({ email })

    if (foundUser) {
      setResponse(ctx, { action: ActionStatus.Conflict })
      return
    }

    await next()
  } catch (err) {
    setResponse(ctx, { action: ActionStatus.Error })
  }
}

function entityExists(entity) {
  const Entity = require('../models/entity')(entity)
  return async function (ctx, next) {
    try {
      const { id } = ctx.params
      const foundEntity = await Entity.findById(id)

      if (!foundEntity) {
        setResponse(ctx, { action: ActionStatus.NotFound })
        return
      }

      await next()
    } catch (err) {
      setResponse(ctx, { action: ActionStatus.Error })
    }
  }
}

function referenceExists(column, tableName) {
  const Model = require('../models/entity')(tableName)
  return async function (ctx, next) {
    try {
      const id = ctx.request.body[column]
      if (!id) {
        await next()
        return
      }
      const foundReference = await Model.findById(id)

      if (!foundReference) {
        setResponse(ctx, {
          action: ActionStatus.Unprocessable,
          payload: { error: `${column} references inexistent entity.` },
        })
        return
      }

      await next()
    } catch (err) {
      setResponse(ctx, { action: ActionStatus.Error })
    }
  }
}

function disallowDuplicate(entity, attr) {
  const Entity = require('../models/entity')(entity)
  return async function (ctx, next) {
    try {
      const payload = {}
      payload[attr] = ctx.request.body[attr]
      const duplicated = await Entity.findOne(payload)

      if (duplicated) {
        setResponse(ctx, { action: ActionStatus.Conflict })
        return
      }

      await next()
    } catch (err) {
      setResponse(ctx, { action: ActionStatus.Error })
    }
  }
}
/**
 * Check if any item in the collection already exists.
 * In the case there is one, it will set the status code to conflict.
 * @param {string} entity Name of the collection
 * @param {string} attr Name of the attribute
 */
function disallowDuplicates(entity, attr) {
  const Entity = require('../models/entity')(entity)
  return async function (ctx, next) {
    try {
      const payload = ctx.request.body[entity]
      const values = payload.map((p) => p[attr])

      if (await Entity.includesAny(attr, values)) {
        setResponse(ctx, { action: ActionStatus.Conflict })
        return
      }

      await next()
    } catch (err) {
      setResponse(ctx, { action: ActionStatus.Error })
    }
  }
}

module.exports = {
  userExists,
  entityExists,
  referenceExists,
  disallowDuplicate,
  disallowDuplicates,
}
