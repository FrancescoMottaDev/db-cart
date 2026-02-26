import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import CustomerAddress from '#models/customer_address'
import Zone from '#models/zone'
import ZoneRegions from '#models/zone_regions'

export default class Region extends BaseModel {
  public static table = 'region'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string | null

  @column()
  declare name: string | null

  @column({ columnName: 'parent' })
  declare parentId: number | null

  @column()
  declare type: string | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Region, {
    foreignKey: 'parentId',
  })
  declare parentRegion: BelongsTo<typeof Region>

  @manyToMany(() => Zone, {
    pivotTable: 'zone_regions',
    pivotForeignKey: 'region_id',
    pivotRelatedForeignKey: 'zone_id',
  })
  declare zones: ManyToMany<typeof Zone>

  @hasMany(() => Region, {
    foreignKey: 'parentId',
  })
  declare childrenRegions: HasMany<typeof Region>

  @hasMany(() => CustomerAddress, {
    foreignKey: 'countryId',
  })
  declare customerAddresses: HasMany<typeof CustomerAddress>

  @hasMany(() => ZoneRegions, {
    foreignKey: 'regionId',
  })
  declare zoneRegions: HasMany<typeof ZoneRegions>
}
