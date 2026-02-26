import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Bundle from '#models/bundle'
import ProductVariant from '#models/product_variant'

export default class BundleProduct extends BaseModel {
  public static table = 'bundle_products'

  @column({ isPrimary: true })
  declare bundleId: number

  @column({ isPrimary: true })
  declare productVariantId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => Bundle, {
    foreignKey: 'bundleId',
  })
  declare bundle: BelongsTo<typeof Bundle>

  @belongsTo(() => ProductVariant, {
    foreignKey: 'productVariantId',
  })
  declare productVariant: BelongsTo<typeof ProductVariant>
}
