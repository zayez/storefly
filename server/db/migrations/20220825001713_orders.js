/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('paymentStatus', (table) => {
    table.increments()
    table.enu('name', ['paid', 'unpaid']).notNullable()
    table.timestamps(true, true, true)
  })

  await knex.schema.createTable('shippingStatus', (table) => {
    table.increments()
    table.enu('name', ['unshipped', 'shipped', 'delivered']).notNullable()
    table.timestamps(true, true, true)
  })

  await knex.schema.createTable('orders', (table) => {
    table.increments()
    table.integer('userId').references('users.id').notNullable()
    table
      .integer('paymentStatusId')
      .references('paymentStatus.id')
      .notNullable()
    table
      .integer('shippingStatusId')
      .references('shippingStatus.id')
      .notNullable()
    table
      .integer('shippingAddressId')
      .references('shippingAddresses.id')
      .notNullable()
    table.datetime('dateOrder')
    table.decimal('subtotal').notNullable()
    table.decimal('total').notNullable()
    table.timestamps(true, true, true)
  })

  await knex.schema.createTable('orderItem', (table) => {
    table.increments()
    table.integer('productId').references('products.id').notNullable()
    table.integer('orderId').references('orders.id').notNullable()
    table.decimal('price').notNullable()
    table.decimal('subtotal').notNullable()
    table.decimal('total').notNullable()
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
  await knex.schema.dropTable('paymentStatus')
  await knex.schema.dropTable('shippingStatus')
}
