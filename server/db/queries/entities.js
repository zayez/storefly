const knex = require('../')

async function findEntity(entity, id) {
  return await knex(entity).select('*').where('id', id).first()
}

module.exports = {
  findEntity,
}
