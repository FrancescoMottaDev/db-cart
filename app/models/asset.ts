import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'
import ProductAsset from '#models/product_asset'
import ProductVariant from '#models/product_variant'
import ProductVariantAsset from '#models/product_variant_asset'

export default class Asset extends BaseModel {
  public static table = 'asset'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare width: number | null

  @column()
  declare height: number | null

  /*************  RELATIONS  *************/

  @manyToMany(() => Product, {
    pivotTable: 'product_assets',
    pivotForeignKey: 'asset_id',
    pivotRelatedForeignKey: 'product_id',
    pivotColumns: ['order'],
  })
  declare products: ManyToMany<typeof Product>

  @manyToMany(() => ProductVariant, {
    pivotTable: 'product_variant_assets',
    pivotForeignKey: 'asset_id',
    pivotRelatedForeignKey: 'product_variant_id',
    pivotColumns: ['order'],
  })
  declare productVariants: ManyToMany<typeof ProductVariant>

  @hasMany(() => ProductAsset, {
    foreignKey: 'assetId',
  })
  declare productAssets: HasMany<typeof ProductAsset>

  @hasMany(() => Product, {
    foreignKey: 'featuredImageId',
  })
  declare featuredImageProducts: HasMany<typeof Product>

  @hasMany(() => ProductVariantAsset, {
    foreignKey: 'assetId',
  })
  declare productVariantAssets: HasMany<typeof ProductVariantAsset>

  @hasMany(() => ProductVariant, {
    foreignKey: 'featuredImageId',
  })
  declare featuredImageProductVariants: HasMany<typeof ProductVariant>
}
