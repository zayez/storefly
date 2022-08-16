/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('productStatus', (table) => {
    table.increments()
    table.enu('name', ['draft', 'active']).notNullable()
    table.timestamps(true, true, true)
  })

  const product = await knex.schema.createTable('products', (table) => {
    table.increments()
    table.text('title').notNullable().unique()
    table.text('description')
    table.decimal('price')
    table.integer('inventory')
    table.text('image')
    table.integer('statusId').references('productStatus.id')
    table.integer('categoryId').references('categories.id')
    table.timestamps(true, true, true)
  })

  return product
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('products')
  await knex.schema.dropTable('productStatus')
}
