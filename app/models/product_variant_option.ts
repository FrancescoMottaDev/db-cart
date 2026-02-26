import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ProductOptionValue from '#models/product_option_value'
import ProductVariant from '#models/product_variant'

export default class ProductVariantOption extends BaseModel {
  public static table = 'product_variant_options'

  @column({ isPrimary: true })
  declare productVariantId: number

  @column({ isPrimary: true })
  declare productOptionsId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => ProductOptionValue, {
    foreignKey: 'productOptionsId',
  })
  declare productOptionValue: BelongsTo<typeof ProductOptionValue>

  @belongsTo(() => ProductVariant, {
    foreignKey: 'productVariantId',
  })
  declare productVariant: BelongsTo<typeof ProductVariant>
}
