import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Asset from '#models/asset'
import AttributeValue from '#models/attribute_value'
import Collection from '#models/collection'
import ProductAsset from '#models/product_asset'
import ProductAttribute from '#models/product_attribute'
import ProductOption from '#models/product_option'
import ProductVariant from '#models/product_variant'

export default class Product extends BaseModel {
  public static table = 'product'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sku: string | null

  @column()
  declare collectionId: number | null

  @column()
  declare featuredImageId: number | null

  @column()
  declare customFields: unknown | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Collection, {
    foreignKey: 'collectionId',
  })
  declare collection: BelongsTo<typeof Collection>

  @belongsTo(() => Asset, {
    foreignKey: 'featuredImageId',
  })
  declare featuredImage: BelongsTo<typeof Asset>

  @manyToMany(() => Asset, {
    pivotTable: 'product_assets',
    pivotForeignKey: 'product_id',
    pivotRelatedForeignKey: 'asset_id',
    pivotColumns: ['order'],
  })
  declare assets: ManyToMany<typeof Asset>

  @manyToMany(() => AttributeValue, {
    pivotTable: 'product_attributes',
    pivotForeignKey: 'product_id',
    pivotRelatedForeignKey: 'attribute_value_id',
  })
  declare attributeValues: ManyToMany<typeof AttributeValue>

  @hasMany(() => ProductAsset, {
    foreignKey: 'productId',
  })
  declare productAssets: HasMany<typeof ProductAsset>

  @hasMany(() => ProductAttribute, {
    foreignKey: 'productId',
  })
  declare productAttributes: HasMany<typeof ProductAttribute>

  @hasMany(() => ProductOption, {
    foreignKey: 'productId',
  })
  declare productOptions: HasMany<typeof ProductOption>

  @hasMany(() => ProductVariant, {
    foreignKey: 'productId',
  })
  declare productVariants: HasMany<typeof ProductVariant>
}
