/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('shippingAddresses', (table) => {
    table.increments()
    table.text('addressLine1').notNullable()
    table.text('addressLine2')
    table.text('city').notNullable()
    table.text('country').notNullable()
    table.text('state').notNullable()
    table.text('postalCode').notNullable()
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
