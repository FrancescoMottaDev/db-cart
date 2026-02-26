import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Order from '#models/order'
import OrderLineItem from '#models/order_line_item'
import ShippedItem from '#models/shipped_item'
import StockLocation from '#models/stock_location'

export default class Shipment extends BaseModel {
  public static table = 'shipment'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number | null

  @column({ columnName: 'from_stock_location' })
  declare fromStockLocationId: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => StockLocation, {
    foreignKey: 'fromStockLocationId',
  })
  declare fromStockLocation: BelongsTo<typeof StockLocation>

  @belongsTo(() => Order, {
    foreignKey: 'orderId',
  })
  declare order: BelongsTo<typeof Order>

  @manyToMany(() => OrderLineItem, {
    pivotTable: 'shipped_items',
    pivotForeignKey: 'shipment_id',
    pivotRelatedForeignKey: 'order_line_item_id',
  })
  declare orderLineItems: ManyToMany<typeof OrderLineItem>

  @hasMany(() => ShippedItem, {
    foreignKey: 'shipmentId',
  })
  declare shippedItems: HasMany<typeof ShippedItem>
}
