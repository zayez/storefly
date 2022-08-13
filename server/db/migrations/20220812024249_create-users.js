/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments()
      table.text('firstName').notNullable()
      table.text('lastName').notNullable()
      table.text('email').notNullable().unique()
      table.text('password').notNullable()
      table.timestamps(true, true, true)
    })
    .then(() => {
      return knex.schema.createTable('userRoles', (table) => {
        table.increments()
        table.integer('userId').references('id').inTable('users')
        table.integer('roleId').references('id').inTable('roles')
        table.timestamps(true, true, true)
      })
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('userRoles').then(() => {
    knex.schema.dropTable('users')
  })
}
