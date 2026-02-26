import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Order from '#models/order'
import ProductVariant from '#models/product_variant'
import ProductVariantCustomization from '#models/product_variant_customization'
import Return from '#models/return'
import ReturnLineItem from '#models/return_line_item'
import Shipment from '#models/shipment'
import ShippedItem from '#models/shipped_item'
import StockReservation from '#models/stock_reservation'

export default class OrderLineItem extends BaseModel {
  public static table = 'order_line_item'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number | null

  @column()
  declare productVariantId: number | null

  @column()
  declare quantity: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Order, {
    foreignKey: 'orderId',
  })
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => ProductVariant, {
    foreignKey: 'productVariantId',
  })
  declare productVariant: BelongsTo<typeof ProductVariant>

  @manyToMany(() => Return, {
    pivotTable: 'return_line_items',
    pivotForeignKey: 'order_line_item_id',
    pivotRelatedForeignKey: 'return_id',
  })
  declare returns: ManyToMany<typeof Return>

  @manyToMany(() => Shipment, {
    pivotTable: 'shipped_items',
    pivotForeignKey: 'order_line_item_id',
    pivotRelatedForeignKey: 'shipment_id',
  })
  declare shipments: ManyToMany<typeof Shipment>

  @hasMany(() => ProductVariantCustomization, {
    foreignKey: 'orderLineItemId',
  })
  declare productVariantCustomizations: HasMany<typeof ProductVariantCustomization>

  @hasMany(() => ReturnLineItem, {
    foreignKey: 'orderLineItemId',
  })
  declare returnLineItems: HasMany<typeof ReturnLineItem>

  @hasMany(() => ShippedItem, {
    foreignKey: 'orderLineItemId',
  })
  declare shippedItems: HasMany<typeof ShippedItem>

  @hasMany(() => StockReservation, {
    foreignKey: 'orderLineItemId',
  })
  declare stockReservations: HasMany<typeof StockReservation>
}
