import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import OrderLineItem from '#models/order_line_item'
import ProductVariant from '#models/product_variant'

export default class ProductVariantCustomization extends BaseModel {
  public static table = 'product_variant_customization'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productVariantId: number | null

  @column({ columnName: 'order_line_item' })
  declare orderLineItemId: number | null

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
