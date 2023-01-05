const paymentStatus = require('./data/paymentStatus.json')
const shippingStatus = require('./data/shippingStatus.json')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('paymentStatus').del()
  await knex('shippingStatus').del()
  await knex('paymentStatus').insert(paymentStatus)
  await knex('shippingStatus').insert(shippingStatus)
  await knex('orderItem').del()
  await knex('orders').del()
}
