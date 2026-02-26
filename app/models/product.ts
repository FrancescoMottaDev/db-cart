import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Collection from './collection.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Asset from './asset.js'
import ProductOption from './product_option.js'
import ProductVariant from './product_variant.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare sku: string

  @column()
  declare collectionId: number

  @column()
  declare featuredImageId: number

  @column()
  declare customFields: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/

  @belongsTo(() => Collection, {
    foreignKey: 'collection_id',
  })
  declare collection: BelongsTo<typeof Collection>

  @belongsTo(() => Asset, {
    foreignKey: 'id',
  })
  declare asset: BelongsTo<typeof Asset>

  @hasMany(() => ProductOption, {
    foreignKey: 'product_id',
  })
  declare productOptions: HasMany<typeof ProductOption>

  @hasMany(() => ProductVariant, {
    foreignKey: 'product_id',
  })
  declare productVariants: HasMany<typeof ProductVariant>
}
