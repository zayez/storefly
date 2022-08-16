const productStatuses = require('./data/productStatuses.json').productStatuses
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('productStatus').del()
  await knex('productStatus').insert(productStatuses)
  await knex('products').del()
}
