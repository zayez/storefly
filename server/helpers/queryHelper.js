/*
Taken from here:
https://github.com/robmclarty/cred-server/blob/main/server/helpers/query_helper.js

Original work (MIT) by @robmclarty at:
https://github.com/robmclarty/cred-server

MIT license
*/

const knex = require('../db')

module.exports = (tableName, selectableFields = '*') => {
  const find = async (filters, page) => {
    const items = await knex
      .select(selectableFields)
      .from(tableName)
      .where(filters)
      .paginate({ perPage: 25, currentPage: page })

    return items.data
  }

  const findAll = async (page) => {
    return await find({}, page)
  }
  const findOne = async (filters) => {
    return await knex.first(selectableFields).from(tableName).where(filters)
  }

  const findById = async (id) => {
    return await knex(tableName).first(selectableFields).where({ id })
  }

  const create = async (props) => {
    const id = await knex(tableName).insert(props)
    return await findById(id)
  }

  const update = async (id, props) => {
    await knex(tableName).update(props).where({ id })
    return await findById(id)
  }

  const destroy = async (id) => {
    return await knex(tableName).del().where({ id })
  }

  const destroyAll = async (filters) => {
    return filters
      ? await knex(tableName).del().where(filters)
      : await knex(tableName).del()
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
  }
}
