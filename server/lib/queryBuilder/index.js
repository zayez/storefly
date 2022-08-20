/*
This is modified work. Original is from here:
https://github.com/robmclarty/cred-server/blob/main/server/helpers/query_helper.js

*/

const knex = require('../../db')
require('../../models')
const { ITEMS_PER_PAGE } = require('../../config').app

/**
 * @typedef {object} PaginationOptions pagination options
 * @property {integer} page page index
 * @property {integer} perPage amount of items per page
 */

/**
 * A simple module queryBuilder.
 * @version 1.0
 * @exports storeflyAPI/queryBuilder
 * @namespace queryBuilder
 */
module.exports = (tableName, selectableFields = '*') => {
  /**
   * Finds with filters.
   * @memberof queryBuilder
   * @param {Object[]} filters filters
   * @param {PaginationOptions} opts options
   * @returns {Entity[]} entities
   */
  const find = async (filters, { page = 1, perPage = ITEMS_PER_PAGE }) => {
    const items = await knex
      .select(selectableFields)
      .from(tableName)
      .where(filters)
      .paginate({ perPage: perPage, currentPage: page })

    return items.data
  }

  /**
   * Finds all.
   * @param {PaginationOptions} paginationOpts pagination options
   * @returns {Entity[]} Entities
   */
  const findAll = async (pagination) => {
    return await find({}, pagination)
  }

  /**
   * Finds first match.
   * @param {Object[]} filters filters to apply
   * @returns {Entity=} entity if found
   */
  const findOne = async (filters) => {
    return await knex.first(selectableFields).from(tableName).where(filters)
  }

  /**
   * Finds item by ID.
   * @param {integer} id id
   * @returns {Entity=} entitiy if found
   */
  const findById = async (id) => {
    return await knex(tableName).first(selectableFields).where({ id })
  }

  /**
   * Inserts entity.
   * @param {Entity} entity entity to create
   * @returns {Entity=} created entity
   */
  const create = async (entity) => {
    const id = await knex(tableName).insert(entity)
    return await findById(id)
  }

  /**
   * Updates item.
   * @param {integer} id id
   * @param {Object[]} props properties to update
   * @returns {Entity=} entity if successfully updated
   */
  const update = async (id, props) => {
    await knex(tableName).update(props).where({ id })
    return await findById(id)
  }

  /**
   * Destroys item.
   * @param {integer} id id
   * @returns {integer[]} id
   */
  const destroy = async (id) => {
    return await knex(tableName).del().where({ id })
  }

  /**
   * Destroys all items.
   * @param {Object[]=} filters filters to apply
   * @returns {integer[]} last id
   */
  const destroyAll = async (filters) => {
    return filters
      ? await knex(tableName).del().where(filters)
      : await knex(tableName).del()
  }

  /**
   * Check if table already includes a row with any of the values in the specified field.
   * @param {string} field Name of the column
   * @param {array} values List of values to check
   * @returns Returns true if includes any the values, otherwise false.
   */
  const includesAny = async (field, values) => {
    const items = await knex(tableName).select('id').whereIn(field, values)
    return items.length > 0
  }

  return {
    find,
    findAll,
    findOne,
    findById,
    create,
    update,
    destroy,
    destroyAll,
    includesAny,
  }
}
