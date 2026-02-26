import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Asset from '#models/asset'
import Product from '#models/product'

export default class ProductAsset extends BaseModel {
  public static table = 'product_assets'

  @column({ isPrimary: true })
  declare productId: number

  @column({ isPrimary: true })
  declare assetId: number

  @column()
  declare order: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Asset, {
    foreignKey: 'assetId',
  })
  declare asset: BelongsTo<typeof Asset>

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  declare product: BelongsTo<typeof Product>
}
