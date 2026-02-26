import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import OrderLineItem from '#models/order_line_item'
import ProductVariant from '#models/product_variant'

export default class StockReservation extends BaseModel {
  public static table = 'stock_reservation'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status: string | null

  @column()
  declare orderLineItemId: number | null

  @column()
  declare productVariantId: number | null

  @column()
  declare quantity: number | null

  @column.dateTime()
  declare expiresAt: DateTime | null

  /*************  RELATIONS  *************/

  @belongsTo(() => OrderLineItem, {
    foreignKey: 'orderLineItemId',
  })
  declare orderLineItem: BelongsTo<typeof OrderLineItem>

  @belongsTo(() => ProductVariant, {
    foreignKey: 'productVariantId',
  })
  declare productVariant: BelongsTo<typeof ProductVariant>
}
