import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Order from '#models/order'
import OrderLineItem from '#models/order_line_item'
import Refund from '#models/refund'
import ReturnLineItem from '#models/return_line_item'

export default class Return extends BaseModel {
  public static table = 'return'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Order, {
    foreignKey: 'orderId',
  })
  declare order: BelongsTo<typeof Order>

  @manyToMany(() => OrderLineItem, {
    pivotTable: 'return_line_items',
    pivotForeignKey: 'return_id',
    pivotRelatedForeignKey: 'order_line_item_id',
  })
  declare orderLineItems: ManyToMany<typeof OrderLineItem>

  @hasMany(() => Refund, {
    foreignKey: 'returnId',
  })
  declare refunds: HasMany<typeof Refund>

  @hasMany(() => ReturnLineItem, {
    foreignKey: 'returnId',
  })
  declare returnLineItems: HasMany<typeof ReturnLineItem>
}
