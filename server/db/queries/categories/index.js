const knex = require('../..')

async function addCategory(title) {
  const newCategory = { title }
  const id = await knex('categories').insert(newCategory)
  return await findCategoryById(id)
}

async function editCategory(id, title) {
  const category = { title }
  await knex('categories').where({ id }).update(category)
  return await findCategoryById(id)
}

async function removeCategory(id) {
  return await knex('categories').where({ id }).del()
}

async function getCategory(id) {
  return await knex('categories').select('*').where({ id }).first()
}

async function getCategories() {
  return await knex('categories').select('*')
}

async function findCategoryById(id) {
  return await knex('categories').select('*').where('id', id).first()
}

module.exports = {
  addCategory,
  editCategory,
  removeCategory,
  getCategory,
  getCategories,
}
