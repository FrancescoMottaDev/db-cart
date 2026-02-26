import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Order from '#models/order'
import Payment from '#models/payment'

export default class PaymentMethod extends BaseModel {
  public static table = 'payment_method'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @hasMany(() => Order, {
    foreignKey: 'paymentMethodId',
  })
  declare orders: HasMany<typeof Order>

  @hasMany(() => Payment, {
    foreignKey: 'paymentMethodId',
  })
  declare payments: HasMany<typeof Payment>
}
