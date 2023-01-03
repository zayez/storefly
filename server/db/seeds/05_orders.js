const paymentStatus = require('./data/paymentStatus.json')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('paymentStatus').del()
  await knex('paymentStatus').insert(paymentStatus)
  await knex('orderItem').del()
  await knex('orders').del()
}
