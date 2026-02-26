import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Asset from '#models/asset'
import AttributeValue from '#models/attribute_value'
import Bundle from '#models/bundle'
import BundleProduct from '#models/bundle_product'
import OrderLineItem from '#models/order_line_item'
import Product from '#models/product'
import ProductOptionValue from '#models/product_option_value'
import ProductVariantAsset from '#models/product_variant_asset'
import ProductVariantAttribute from '#models/product_variant_attribute'
import ProductVariantCustomization from '#models/product_variant_customization'
import ProductVariantOption from '#models/product_variant_option'
import ShippingCategory from '#models/shipping_category'
import StockLevel from '#models/stock_level'
import StockReservation from '#models/stock_reservation'
import TaxCategory from '#models/tax_category'

export default class ProductVariant extends BaseModel {
  public static table = 'product_variant'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number | null

  @column()
  declare taxCategoryId: number | null

  @column()
  declare shippingCategoryId: number | null

  @column()
  declare featuredImageId: number | null

  @column()
  declare price: number | null

  @column()
  declare customFields: unknown | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Asset, {
    foreignKey: 'featuredImageId',
  })
  declare featuredImage: BelongsTo<typeof Asset>

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => ShippingCategory, {
    foreignKey: 'shippingCategoryId',
  })
  declare shippingCategory: BelongsTo<typeof ShippingCategory>

  @belongsTo(() => TaxCategory, {
    foreignKey: 'taxCategoryId',
  })
  declare taxCategory: BelongsTo<typeof TaxCategory>

  @manyToMany(() => Asset, {
    pivotTable: 'product_variant_assets',
    pivotForeignKey: 'product_variant_id',
    pivotRelatedForeignKey: 'asset_id',
    pivotColumns: ['order'],
  })
  declare assets: ManyToMany<typeof Asset>

  @manyToMany(() => AttributeValue, {
    pivotTable: 'product_variant_attributes',
    pivotForeignKey: 'product_variant_id',
    pivotRelatedForeignKey: 'attribute_value_id',
  })
  declare attributeValues: ManyToMany<typeof AttributeValue>

  @manyToMany(() => Bundle, {
    pivotTable: 'bundle_products',
    pivotForeignKey: 'product_variant_id',
    pivotRelatedForeignKey: 'bundle_id',
  })
  declare bundles: ManyToMany<typeof Bundle>

  @manyToMany(() => ProductOptionValue, {
    pivotTable: 'product_variant_options',
    pivotForeignKey: 'product_variant_id',
    pivotRelatedForeignKey: 'product_options_id',
  })
  declare productOptionValues: ManyToMany<typeof ProductOptionValue>

  @hasMany(() => BundleProduct, {
    foreignKey: 'productVariantId',
  })
  declare bundleProducts: HasMany<typeof BundleProduct>

  @hasMany(() => OrderLineItem, {
    foreignKey: 'productVariantId',
  })
  declare orderLineItems: HasMany<typeof OrderLineItem>

  @hasMany(() => ProductVariantAsset, {
    foreignKey: 'productVariantId',
  })
  declare productVariantAssets: HasMany<typeof ProductVariantAsset>

  @hasMany(() => ProductVariantAttribute, {
    foreignKey: 'productVariantId',
  })
  declare productVariantAttributes: HasMany<typeof ProductVariantAttribute>

  @hasMany(() => ProductVariantCustomization, {
    foreignKey: 'productVariantId',
  })
  declare productVariantCustomizations: HasMany<typeof ProductVariantCustomization>

  @hasMany(() => ProductVariantOption, {
    foreignKey: 'productVariantId',
  })
  declare productVariantOptions: HasMany<typeof ProductVariantOption>

  @hasMany(() => StockLevel, {
    foreignKey: 'productVariantId',
  })
  declare stockLevels: HasMany<typeof StockLevel>

  @hasMany(() => StockReservation, {
    foreignKey: 'productVariantId',
  })
  declare stockReservations: HasMany<typeof StockReservation>
}
