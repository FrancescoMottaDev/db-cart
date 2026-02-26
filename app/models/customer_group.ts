import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Customer from '#models/customer'

export default class CustomerGroup extends BaseModel {
  public static table = 'customer_group'

  @column({ isPrimary: true })
  declare id: number

  /*************  RELATIONS  *************/

  @hasMany(() => Customer, {
    foreignKey: 'customerGroupId',
  })
  declare customers: HasMany<typeof Customer>
}
