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
        const data = {}
        data[modelName] = mappings[`map${capitalize(modelName)}`](createdModel)
        return {
          action: ActionStatus.Created,
          data,
        }
      } else {
        return {
          action: ActionStatus.BadRequest,
          data: null,
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const update = async (id, model) => {
    try {
      const updatedModel = await Model.update(id, model)
      if (updatedModel) {
        const data = {}
        data[modelName] = mappings[`map${capitalize(modelName)}`](updatedModel)
        return {
          action: ActionStatus.Ok,
          data,
        }
      } else {
        return {
          action: ActionStatus.BadRequest,
          data: null,
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const destroy = async (id) => {
    try {
      const selectedModel = await Model.destroy(id)
      if (selectedModel) {
        return {
          action: ActionStatus.Ok,
          data: selectedModel,
        }
      } else {
        return {
          action: ActionStatus.BadRequest,
          data: null,
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const getOne = async (id) => {
    try {
      const selectedModel = await Model.findById(id)
      if (selectedModel) {
        const data = {}
        data[modelName] = mappings[`map${capitalize(modelName)}`](selectedModel)

        return {
          action: ActionStatus.Ok,
          data,
        }
      } else {
        return {
          action: ActionStatus.BadRequest,
          data: null,
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const getAll = async (page) => {
    try {
      const models = await Model.findAll(page)
      if (models) {
        const data = {}
        data[controllerName] =
          mappings[`map${capitalize(controllerName)}`](models)
        return {
          action: ActionStatus.Ok,
          data,
        }
      } else {
        return {
          action: ActionStatus.BadRequest,
          data: null,
        }
      }
    } catch (err) {
      console.log(err)
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
