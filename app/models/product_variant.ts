import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Asset from './asset.js'
import Product from './product.js'
import ShippingCategory from './shipping_category.js'
import TaxCategory from './tax_category.js'

export default class ProductVariant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare taxCategoryId: number

  @column()
  declare shippingCategoryId: number

  @column()
  declare featuredImageId: number

  @column()
  declare price: number

  @column()
  declare customFields: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/

  @belongsTo(() => Product, {
    foreignKey: 'id',
  })
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => TaxCategory, {
    foreignKey: 'id',
  })
  declare taxCategory: BelongsTo<typeof TaxCategory>

  @belongsTo(() => ShippingCategory, {
    foreignKey: 'id',
  })
  declare shippingCategory: BelongsTo<typeof ShippingCategory>

  @belongsTo(() => Asset, {
    foreignKey: 'id',
  })
  declare asset: BelongsTo<typeof Asset>
}
