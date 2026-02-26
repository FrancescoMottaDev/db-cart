import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Order from '#models/order'
import PaymentMethod from '#models/payment_method'
import Refund from '#models/refund'

export default class Payment extends BaseModel {
  public static table = 'payment'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number | null

  @column()
  declare paymentMethodId: number | null

  @column()
  declare status: string | null

  @column()
  declare paymentMetadata: unknown | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Order, {
    foreignKey: 'orderId',
  })
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => PaymentMethod, {
    foreignKey: 'paymentMethodId',
  })
  declare paymentMethod: BelongsTo<typeof PaymentMethod>

  @hasMany(() => Refund, {
    foreignKey: 'paymentId',
  })
  declare refunds: HasMany<typeof Refund>
}
