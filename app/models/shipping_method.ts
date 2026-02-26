import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Order from '#models/order'

export default class ShippingMethod extends BaseModel {
  public static table = 'shipping_method'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @hasMany(() => Order, {
    foreignKey: 'shippingMethodId',
  })
  declare orders: HasMany<typeof Order>
}
