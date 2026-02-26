import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import ProductOption from '#models/product_option'
import ProductVariant from '#models/product_variant'
import ProductVariantOption from '#models/product_variant_option'

export default class ProductOptionValue extends BaseModel {
  public static table = 'product_option_value'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: string | null

  @column()
  declare optionId: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => ProductOption, {
    foreignKey: 'optionId',
  })
  declare productOption: BelongsTo<typeof ProductOption>

  @manyToMany(() => ProductVariant, {
    pivotTable: 'product_variant_options',
    pivotForeignKey: 'product_options_id',
    pivotRelatedForeignKey: 'product_variant_id',
  })
  declare productVariants: ManyToMany<typeof ProductVariant>

  @hasMany(() => ProductVariantOption, {
    foreignKey: 'productOptionsId',
  })
  declare productVariantOptions: HasMany<typeof ProductVariantOption>
}
