/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('orders', (table) => {
    table.increments()
    table.integer('userId').references('users.id').notNullable()
    table.datetime('dateOrder')
    table.timestamps(true, true, true)
  })

  await knex.schema.createTable('orderItem', (table) => {
    table.increments()
    table.integer('productId').references('products.id').notNullable()
    table.integer('orderId').references('orders.id').notNullable()
    table.integer('quantity').notNullable()
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('orderItem')
  await knex.schema.dropTable('orders')
}
