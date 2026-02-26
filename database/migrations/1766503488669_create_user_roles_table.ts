import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')

      // Composite PK (impedisce duplicati)
      table.primary(['user_id', 'role_id'], 'user_roles_pk')

      table.index(['user_id'], 'user_roles_user_id_idx')
      table.index(['role_id'], 'user_roles_role_id_idx')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
