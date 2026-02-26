import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Order from '#models/order'
import Payment from '#models/payment'
import Return from '#models/return'

export default class Refund extends BaseModel {
  public static table = 'refund'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number | null

  @column()
  declare returnId: number | null

  @column()
  declare paymentId: number | null

  @column()
  declare amount: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Order, {
    foreignKey: 'orderId',
  })
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => Payment, {
    foreignKey: 'paymentId',
  })
  declare payment: BelongsTo<typeof Payment>

  @belongsTo(() => Return, {
    foreignKey: 'returnId',
  })
  declare return: BelongsTo<typeof Return>
}
