const plur = require('pluralize')
const capitalize = require('upper-case-first').upperCaseFirst
const mappings = require('../helpers/mappings')
const ActionStatus = require('../types/ActionStatus')

module.exports = (controllerName) => {
  const modelName = plur.singular(controllerName)
  const Model = require(`../models/${modelName}`)

  const create = async (model) => {
    try {
      const createdModel = await Model.create(model)
      if (createdModel) {
        const payload = {}
        payload[modelName] =
          mappings[`map${capitalize(modelName)}`](createdModel)
        return {
          action: ActionStatus.Created,
          payload,
        }
      }
      return {
        action: ActionStatus.BadRequest,
        payload: null,
      }
    } catch (err) {
      throw err
    }
  }

  const update = async (id, model) => {
    try {
      const updatedModel = await Model.update(id, model)
      if (updatedModel) {
        const payload = {}
        payload[modelName] =
          mappings[`map${capitalize(modelName)}`](updatedModel)
        return {
          action: ActionStatus.Ok,
          payload,
        }
      }
      return {
        action: ActionStatus.BadRequest,
        payload: null,
      }
    } catch (err) {
      throw err
    }
  }

  const destroy = async (id) => {
    try {
      const selectedModel = await Model.destroy(id)
      if (selectedModel) {
        return {
          action: ActionStatus.Ok,
          payload: selectedModel,
        }
      }
      return {
        action: ActionStatus.BadRequest,
        payload: null,
      }
    } catch (err) {
      throw err
    }
  }

  const getOne = async (id) => {
    try {
      const selectedModel = await Model.findById(id)
      if (selectedModel) {
        const payload = {}
        payload[modelName] =
          mappings[`map${capitalize(modelName)}`](selectedModel)

        return {
          action: ActionStatus.Ok,
          payload,
        }
      }
      return {
        action: ActionStatus.NotFound,
        payload: null,
      }
    } catch (err) {
      throw err
    }
  }

  const getAll = async (pagination) => {
    try {
      const models = await Model.findAll(pagination)
      if (models) {
        const payload = {}
        payload[controllerName] =
          mappings[`map${capitalize(controllerName)}`](models)
        return {
          action: ActionStatus.Ok,
          payload,
        }
      }
      return {
        action: ActionStatus.NotFound,
        payload: null,
      }
    } catch (err) {
      throw err
    }
  }

  return {
    create,
    update,
    destroy,
    getOne,
    getAll,
  }
}
