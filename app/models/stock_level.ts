import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ProductVariant from '#models/product_variant'
import StockLocation from '#models/stock_location'

export default class StockLevel extends BaseModel {
  public static table = 'stock_level'

  @column({ isPrimary: true })
  declare stockLocationId: number

  @column({ isPrimary: true })
  declare productVariantId: number

  @column()
  declare quantityAvailable: number | null

  @column()
  declare quantityAllocated: number | null

  @column()
  declare quantityReserved: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => ProductVariant, {
    foreignKey: 'productVariantId',
  })
  declare productVariant: BelongsTo<typeof ProductVariant>

  @belongsTo(() => StockLocation, {
    foreignKey: 'stockLocationId',
  })
  declare stockLocation: BelongsTo<typeof StockLocation>
}
