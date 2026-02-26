import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Asset from '#models/asset'
import ProductVariant from '#models/product_variant'

export default class ProductVariantAsset extends BaseModel {
  public static table = 'product_variant_assets'

  @column({ isPrimary: true })
  declare productVariantId: number

  @column({ isPrimary: true })
  declare assetId: number

  @column()
  declare order: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Asset, {
    foreignKey: 'assetId',
  })
  declare asset: BelongsTo<typeof Asset>

  @belongsTo(() => ProductVariant, {
    foreignKey: 'productVariantId',
  })
  declare productVariant: BelongsTo<typeof ProductVariant>
}
