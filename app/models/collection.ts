import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare parentCollectionId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/

  @belongsTo(() => Collection, {
    foreignKey: 'parentCollectionId',
  })
  declare parentCollection: BelongsTo<typeof Collection>

  @hasMany(() => Collection, {
    foreignKey: 'parentCollectionId',
  })
  declare childrenCollections: HasMany<typeof Collection>
}
