import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name', 255).notNullable()
      table.string('email', 254).notNullable().unique()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      table.index(['email'], 'users_email_idx')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
