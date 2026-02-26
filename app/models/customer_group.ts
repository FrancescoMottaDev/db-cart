import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'

export default class CustomerGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  /*************  RELATIONS  *************/

  @hasMany(() => Customer)
  declare customers: HasMany<typeof Customer>
}
