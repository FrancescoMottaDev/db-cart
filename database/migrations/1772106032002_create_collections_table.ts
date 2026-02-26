import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collection'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code', 255).notNullable()
      table.string('name', 255).notNullable()
      table
        .integer('parent_collection_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(this.tableName)
        .onDelete('SET NULL')

      table.index(['code'], 'collection_code_idx')
      table.index(['name'], 'collection_name_idx')
      table.index(['parent_collection_id'], 'collection_parent_collection_id_idx')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
