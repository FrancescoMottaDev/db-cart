import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Zone from './zone.js'
import CustomerAddress from './customer_address.js'

export default class Region extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare type: string

  @column()
  declare parent: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Region, {
    foreignKey: 'parent',
  })
  declare parentRegion: BelongsTo<typeof Region>

  @hasMany(() => Region, {
    foreignKey: 'parent',
  })
  declare childrenRegion: HasMany<typeof Region>

  @hasMany(() => CustomerAddress, {
    foreignKey: 'country_id',
  })
  declare addresses: HasMany<typeof CustomerAddress>

  @manyToMany(() => Zone, {
    localKey: 'id',
    relatedKey: 'id',
    pivotTable: 'zone_regions',
    pivotForeignKey: 'region_id',
    pivotRelatedForeignKey: 'zone_id',
  })
  declare zones: ManyToMany<typeof Zone>
}
