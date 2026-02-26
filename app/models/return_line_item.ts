import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import OrderLineItem from '#models/order_line_item'
import Return from '#models/return'

export default class ReturnLineItem extends BaseModel {
  public static table = 'return_line_items'

  @column({ isPrimary: true })
  declare returnId: number

  @column({ isPrimary: true })
  declare orderLineItemId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => OrderLineItem, {
    foreignKey: 'orderLineItemId',
  })
  declare orderLineItem: BelongsTo<typeof OrderLineItem>

  @belongsTo(() => Return, {
    foreignKey: 'returnId',
  })
  declare return: BelongsTo<typeof Return>
}
