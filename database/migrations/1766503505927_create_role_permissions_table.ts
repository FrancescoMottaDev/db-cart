import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')

      table
        .integer('permission_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')

      // Composite PK
      table.primary(['role_id', 'permission_id'], 'role_permissions_pk')

      table.index(['role_id'], 'role_permissions_role_id_idx')
      table.index(['permission_id'], 'role_permissions_permission_id_idx')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
