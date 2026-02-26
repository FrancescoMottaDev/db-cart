import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class Collection extends BaseModel {
  public static table = 'collection'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string | null

  @column()
  declare name: string | null

  @column()
  declare parentCollectionId: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Collection, {
    foreignKey: 'parentCollectionId',
  })
  declare parentCollection: BelongsTo<typeof Collection>

  @hasMany(() => Collection, {
    foreignKey: 'parentCollectionId',
  })
  declare collections: HasMany<typeof Collection>

  @hasMany(() => Product, {
    foreignKey: 'collectionId',
  })
  declare products: HasMany<typeof Product>
}
