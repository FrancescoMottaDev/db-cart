import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import OrderLineItem from '#models/order_line_item'
import Shipment from '#models/shipment'

export default class ShippedItem extends BaseModel {
  public static table = 'shipped_items'

  @column({ isPrimary: true })
  declare shipmentId: number

  @column({ isPrimary: true })
  declare orderLineItemId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => OrderLineItem, {
    foreignKey: 'orderLineItemId',
  })
  declare orderLineItem: BelongsTo<typeof OrderLineItem>

  @belongsTo(() => Shipment, {
    foreignKey: 'shipmentId',
  })
  declare shipment: BelongsTo<typeof Shipment>
}
