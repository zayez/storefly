/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments()
      table.text('firstName')
      table.text('lastName')
      table.text('email')
      table.text('password')
      table.timestamps(true, true)
    })
    .then(() => {
      return knex.schema.createTable('userRoles', (table) => {
        table.increments()
        table.integer('userId').references('id').inTable('users')
        table.integer('roleId').references('id').inTable('roles')
        table.timestamps(true, true)
      })
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users').then(() => {
    knex.schema.dropTable('userRoles')
  })
}
