import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import BundleProduct from '#models/bundle_product'
import ProductVariant from '#models/product_variant'

export default class Bundle extends BaseModel {
  public static table = 'bundle'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare price: number | null

  /*************  RELATIONS  *************/

  @manyToMany(() => ProductVariant, {
    pivotTable: 'bundle_products',
    pivotForeignKey: 'bundle_id',
    pivotRelatedForeignKey: 'product_variant_id',
  })
  declare productVariants: ManyToMany<typeof ProductVariant>

  @hasMany(() => BundleProduct, {
    foreignKey: 'bundleId',
  })
  declare bundleProducts: HasMany<typeof BundleProduct>
}
